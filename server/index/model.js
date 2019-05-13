const mongoose = require('mongoose');
const register = mongoose.Schema({
    account: String,
    password: String,
    name: String
},{
    versionKey: false
});

const Model = {
    Register:mongoose.model('users', register)
};
module.exports = Model;

