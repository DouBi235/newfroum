const Model = require('./model');
const jwt = require('jsonwebtoken');
const checkParams = require('../checkParams');
const controller = {
    register (req, res) {
        let isNext = checkParams(req.body);
        if(isNext) {
            res.send(isNext)
        } else {
            Model.Register.findOne({account: req.body.account},(err,result) => {
                if(result) {
                    res.send({code:0, msg: '该手机号码已被注册！'});
                }else {
                    new Model.Register({
                        account: req.body.account,
                        password: req.body.password,
                        name: req.body.name
                    }).save((err, result) => {
                        if(err) {
                            res.send({code:0,msg: '注册失败！'});
                        } else {
                            res.send({code: 1, msg: '注册成功',result})
                        }
                    })
                }
            });
        }

    },
    login (req, res,) {
        delete req.body.name;
        let isNext = checkParams(req.body);
        if(isNext){
            res.send(isNext);
        } else {
            //生成token
            const token  = jwt.sign(
                {
                    name:req.body
                },
                'ILOVEYOU',
                {
                    expiresIn: 60 * 60 //60分钟到期时间
                }
            )
            const whereStr = {
                account: req.body.account,
                password: req.body.password
            };
            Model.Register.findOne(whereStr, (err, result) => {
                result ? req.body = {code: 1,msg: '登陆成功！', data: {result,token}}: req.body= {code: 0, msg: '登录失败'}
                res.send(req.body);
            });
        }
    }
};
module.exports = controller;
