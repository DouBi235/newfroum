require('./db');
const express = require('express');
const app = express(); // 这里用到express的路由级中间件
const user  = require('./index');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


//获取路由中的请求参数

app.use(bodyParser.urlencoded({extended: true}));

//
app.all('*',(req,res,next) => {
    let { url = '' } = req;
    if(!url.includes('/register') && !url.includes('/login')) {
        if(!req.headers.x_access_token) {
            console.log(req.headers.x_access_token)
            res.send({code: 0, msg: '无效token'})
        } else {
            try {
                let token =  jwt.verify(req.headers.x_access_token, 'ILOVEYOU');
                token.name ? next() : res.send({code: 0, msg: '无效token'})
                // if(token.name) next();
                // else  req.send({code: 0, msg: '无效token'});
            } catch(err) {
                console.log(err);
                 res.send({code:0 ,mes: err});
            }
        }
    }
    next();
});

app.use('/', user);
app.listen(3030);
console.log('success Listen....3030');

