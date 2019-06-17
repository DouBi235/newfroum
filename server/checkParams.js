let checkParams = function (value) {
    let obj = null
    for(let key in value) {
        if(!value[key]) {
            obj = {
                code: 0,
                msg: `无效参数 ${key}`
            }
            break;
        }
    }
    return obj ? obj : false
};
module.exports = checkParams