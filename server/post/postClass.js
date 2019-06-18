const mongoose = require('mongoose');
const postClass = mongoose.Schema({
    title: String,
    desc: String
},{
    versionKey: false
});
let model = mongoose.model('postClass', postClass);
module.exports = model;