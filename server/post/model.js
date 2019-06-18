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
    isOut:{
        type: Boolean,
        default: false
    },
    isVia: {
        type: Number,
        default: 0 //0、未通过，1、通过，2、未通过
    },
    praise: {
        type: Number, //点赞数
        default: 0
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: User.Register
    },
    postClassId: {
        type: Schema.Types.ObjectId,
        ref: PostClass
    }
},{
    versionKey: false
});

const Model = {
    Post: mongoose.model('posts', post),
    PostClass
}
module.exports = Model;