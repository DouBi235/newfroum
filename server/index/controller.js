const Model = require('./model');
const jwt = require('jsonwebtoken');
function checkParams (value) {
    let obj = null
    for(let key in value) {
        if(!value[key]) {
            obj = {
                code: 0,
                msg: `无效参数 ${key}`
            }
            break;
        }
    }
    return obj ? obj : false
}
const controller = {
    register (req, res) {
        let isNext = checkParams(req.body)
        if(isNext) {
            res.send(isNext)
        } else {
            console.log(req.body)
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
                result ? req.body = {code: 1,msg: '登陆成功！', data: {user_id:result._id,token}}: req.body= {code: 0, msg: '登录失败'}
                res.send(req.body);
            });
        }
    }
};
module.exports = controller;
