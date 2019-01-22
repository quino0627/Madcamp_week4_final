var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var account = new Schema({
    username: String,
    email: String,  // 각 학교 포털
    passwd: String,  // 로컬계정의 경우엔 비밀번호를 해싱해서 저장
    nick: String,
    thoughtCount: { type: Number, default: 0 },  // 서비스에서 포스트를 작성할 때마다 1씩 올라간다
    createdAt: { type: Date, default: Date.now }
}, {
    versionKey: false
});

module.exports = mongoose.model('account', account);