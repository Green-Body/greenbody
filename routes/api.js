const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
var models = require('../models');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

router.get('/', (req, res)=>res.json({state:'ON'}));

router.get('/test',(req,res)=>{
    models.member.findAll({
        raw:true
    }).then((result)=>{res.json(JSON.stringify(result))});
})

router.post('/login',(req,res)=>{
    const {userid, password} = req.body;
    login(userid,password).then((result)=>{
        if (result == true){
            req.session.userid = userid;
            res.redirect('/myPage');
        } else if (result == -1){
            res.send('ID가 존재하지 않습니다');
        } else {
            res.send('비밀번호가 다릅니다');
        }
    })
});

router.post('/signup',(req,res)=>{
    const {userid,nickname,password} = req.body;
    bcrypt.hash(password,10,(err,encryptedPassowrd)=>{
        signup(userid,nickname,encryptedPassowrd).then((code)=>{
            if (code == 0){
                req.session.userid = userid;
                res.redirect('/myPage');
            }  else if (code == -1) {
                res.send('ID가 이미 존재합니다');
            } else if (code == -2){
                res.send('NICKNAME이 이미 존재합니다');
            }
        }).catch((err)=>{console.log(err)})
    })
});

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/')
})

router.post('/getMyInfo',(req,res)=>{
    if (req.session.userid){
        getMyInfo(req.session.userid).then((result)=>{
            const keys = Object.keys(result);

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i] 
                if (result[key] == null || result[key] == 0){
                    result[key] = '미지정';
                }
            }
            res.send(JSON.stringify(result));
        });
    } else {
        res.json({isLogined: false});
    }
});

router.post('/setMyInfo',(req,res)=>{
    if (req.session.userid){
        console.log(req);
        const {age,gender,disease,term,startAge} = req.body;
        setMyInfo(req.session.userid,req.body).then(()=>{
            res.json({status:"success"});
        });
    } else {
        res.json({isLogined: false});
    }
});

router.post('/getMylogList',(req,res)=>{
    if (req.session.userid){
        getMyLogList(req.session.id).then((result)=>{
            for (let i = 0; i < result.length; i++){
                result[i].smoke_degree = result[i].inhalation;
                delete result[i].inhalation;
                result[i].smoke_type = result[i].type;
                delete result[i].type;
                result[i].smoke_amount = result[i].amount;
                delete result[i].amount;
            }
        })
        res.json(JSON.stringify());
    } else {
        res.json({isLogined: false});
    }
});

router.post('/viewMyLog',(req,res)=>{
    const {id} = req.body;
    if (req.session.userid){
        res.json(JSON.stringify(viewMyLog(req.session.userid,id)));
    } else {
        res.json({isLogined: false});
    }
});

router.post('/addMyLog',(req,res)=>{
    if (req.session.userid){
        addMyLog(req.session.userid,req.body);
    } else {
        res.json({isLogined: false});
    }
});

router.post('/updateMyLog',(req,res)=>{
    if (req.session.userid){
        updateMyLog(req.session.userid,req.body);
    } else {
        res.json({isLogined: false});
    }
});

router.post('/deleteMyLog',(req,res)=>{
    if (req.session.userid){
        id = req.body.id;
        deleteMyLog(req.session.userid,id);
    } else {
        res.json({isLogined: false});
    }
});

router.post('/getMyScore',(req,res)=>{
    if (req.session.userid){
        models.member.findOne({
            raw : true,
            attributes : ['score'],
            where : {user_id : req.session.userid}
        }).then((value)=>{
            res.json({score : value.score});
        })
    } else {
        res.json({isLogined: false});
    }
});

async function login(id,password){
    const data = await models.member.count({
        where:{user_id:id}
    });
    if (data == 0){
        return -1;
    }

    const pw = await models.member.findOne({
        attributes : ['password'],
        where: {
            user_id : id,
        }
    });

    const same = bcrypt.compareSync(password,pw.dataValues.password);
    return same;
}

async function signup(id,nickname,password){
    const findId = await models.member.count({
        where : {user_id : id}
    });
    
    if (findId == 1){
        return -1;
    }

    const findNickname = await models.member.count({
        where : {username : nickname}
    })

    if (findNickname == 1){
        return -2;
    }

    await models.member.create({
        user_id: id,
        username: nickname,
        password: password
    });

    return 0;
}
async function getMyInfo(id){
    const data = await models.member.findOne({
        attributes: ['age','gender','smoking_period','smoking_start_age','disease'],
        where : {user_id : id}
    });

    return data.dataValues;
}

async function setMyInfo(id,data){
    await models.member.update({
        age : data.age,
        gender : data.gender,
        smoking_period : data.term,
        smoking_start_age : data.startAge,
        disease : data.disease
    },{
        where : {user_id : id}
    }).catch(console.log);
}

async function getMyLogList(id){
    const list = await models.user_log.findAll({
        raw: true,
        where:{user_id:id},
        limit: 5
    });

    return list;
}

async function viewMyLog(userid,id){
    return models.user_log.findOne({
        raw: true,
        where : {
            id: id,
            user_id : userid
        }
    });
}

async function addMyLog(userid,data){
    await models.user_log.create({
        user_id: userid,
        amount: data.amount,
        inhalation: data.inhalation,
        type: data.type
    })
}

async function updateMyLog(userid,data){
    await models.user_log.update({
        amount: data.smoke_amount,
        inhalation: data.smoke_degree,
        type: data.smoke_type
    },{
        where : {
            user_id : userid,
            id: data.id
        }
    });
}

async function deleteMyLog(userid,id){
    await models.user_log.destroy({
        where : {
            user_id : userid,
            id : id
        }
    });
}

module.exports = router;