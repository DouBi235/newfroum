const mongoose = require('mongoose');

//用户注册模型
const registerSchema = mongoose.Schema({
    account: String,
    password: String,
    name: String
},{
    versionKey: false
});


const Models = {
    register: mongoose.model('users', registerSchema)
};

module.exports = Models;
