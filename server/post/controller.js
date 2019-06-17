const Model = require('./model');
const checkParams = require('../checkParams'); //检查请求参数完整性
const controllers = {
    post(req,res) {
        let isNext = checkParams(req.body);
        if(isNext) {
            res.send(isNext)
        }else {
            let params = req.body;
            console.log(params);
            new Model.Post({
                title: params['title'],
                content: params['content'],
                // postClassId: 123456,
                // userId: 123456,
            }).save((err,result) => {
                if(err) {
                    res.send({code: 0, msg: '发帖失败！'})
                }else {
                    res.send({code: '1', msg: '发帖成功'})
                }
            })
        }
    }
};
module.exports = controllers;