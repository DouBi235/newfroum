const mongoose = require('mongoose');
const register = mongoose.Schema({
    account: String,
    password: String,
    name: String,
    sex: {
        type: Number,
        default: 3
    },
    email: String,
    isGag: {
        type: Boolean,
        default: false
    }, //是否禁言
    registerDate: {
        type: Date,
        default: new Date().toLocaleString()
    },
},{
    versionKey: false
});

const Model = {
    Register:mongoose.model('users', register)
};
module.exports = Model;

