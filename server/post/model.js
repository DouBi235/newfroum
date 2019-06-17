const mongoose = require('mongoose');
const User = require('../index/model');
const Schema = mongoose.Schema;
const postClass = mongoose.Schema({
    title: String,
    desc: String,
});
const post = mongoose.Schema({
    title: String,
    content: String,
    postDate: {
        type: Date,
        default: new Date().toLocaleString()
    },
    postClassId: {
        type: Schema.Types.ObjectId,
        ref: Model.PostClass
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: User
    }
});

const Model = {
    PostClass: mongoose.model('postClasses',postClass),
    Post: mongoose.model('posts', post)
}
module.exports = Model;