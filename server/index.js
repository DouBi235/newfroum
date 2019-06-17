const express = require('express');
const router = express.Router();
const Index = require('./index/controller');

router.get('/', function(req, res) {
    res.send({Express: 'Express'});
});
router.post('/register', (req, res) => {
    Index.register(req,res)
});
router.post('/login', (req,res) => {
    Index.login(req,res);
});
router.post('/checkRouter', (req,res) => {
    res.send({code:1,msg: 'token未失效'})
})

/*用户发帖操作*/
router.post('/post', (req,res) => {
    Index.post(req,res);
})
module.exports = router;
