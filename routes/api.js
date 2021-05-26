const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var models = require('../models');

router.get('/', (req, res)=>res.json({state:'ON'}));

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
        })
    })
});

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

module.exports = router;