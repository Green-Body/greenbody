const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;
const route = require('../routes/api');
const session = require('express-session');	//세션관리용 미들웨어
const models = require("../models/index.js");

models.sequelize.sync().then( () => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
})


app.use(session({
  httpOnly: true,	//자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
  secure: false,	//https 환경에서만 session 정보를 주고받도록처리
  secret: 'secret key',	//암호화하는 데 쓰일 키
  resave: false,	//세션을 언제나 저장할지 설정함
  saveUninitialized: true,	//세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
  cookie: {	//세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    httpOnly: true,
    Secure: false
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/api', route);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
});