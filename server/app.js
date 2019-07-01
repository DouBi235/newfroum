require('./db');
const express = require('express');
const app = express(); // 这里用到express的路由级中间件
const user  = require('./index');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const session = require('express-session');


//获取路由中的请求参数
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'this is a froum', //加密的字符串，里面内容可以随便写
    resave: false, //强制保存session即使他没变化
    saveUninitialized: true //强制将未初始化的session存储，默认值为true
}));
//
app.all('*',(req,res,next) => {
    console.log('Hello全部');
    let { url = '' } = req;
    if(!url.includes('/register') && !url.includes('/login') && !url.includes('/getAllPost')) {
        if(!req.headers.x_access_token) {
            res.send({code: 0, msg: '无效token'})
        } else {
            try {
                let token =  jwt.verify(req.headers.x_access_token, 'ILOVEYOU');
                token.name ? next() : res.send({code: 0, msg: '无效token'})
                // if(token.name) next();
                // else  req.send({code: 0, msg: '无效token'});
            } catch(err) {
                 res.send({code:0 ,mes: err});
            }
        }
    }else {
        next();
    }


});
app.use('/', user);
app.listen(3030);
console.log('success Listen....3030');

