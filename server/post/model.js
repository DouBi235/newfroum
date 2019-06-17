const mongoose = require('mongoose');
const User = require('../index/model');
const Schema = mongoose.Schema;
const PostClass = require('./postClass');
const post = mongoose.Schema({
    title: String,
    content: String,
    postDate: {
        type: Date,
        default: new Date().toLocaleString()
    },
    // postClassId: {
    //     type: Schema.Types.ObjectId,
    //     ref: PostClass
    // },
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: User.Register
    // }
});

const Model = {
    Post: mongoose.model('posts', post)
}
module.exports = Model;