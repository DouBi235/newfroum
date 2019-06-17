const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/newfroum');

//绑定事件
const db = mongoose.connection;
//mongoose.connection 的两个方法  error 和 open 代表连接失败和成功
db.on('error', (error) => console.log(`Mongoose Connection Error ${error}`));
db.once('open', () => console.log('Mongoose Connection Successs'));
//1.Schema 数据集合的模型骨架，或者是数据属性模型传统意义的表结构
// const registerSchema = mongoose.Schema({
//     account: String,
//     password: String,
// });
//2.model通过Schem构造而成，除了具有Schema定义的数据库骨架以外，还可以具体的操作数据库
//这里表示在zhao数据库中创建一个users的表并且格式为registerSchema
// const Models = {
//     login: mongoose.model('users', registerSchema)
// };
// module.exports = Models;

