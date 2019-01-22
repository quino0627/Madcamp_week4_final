var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    name: String,
    nick: String,
    email: String,  // 각 학교 포털
    passwd: String,  // 로컬계정의 경우엔 비밀번호를 해싱해서 저장
    college: String
}, {
    versionKey: false
});

module.exports = mongoose.model('user', user);