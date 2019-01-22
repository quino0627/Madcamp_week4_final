var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodSchema = new Schema({
    nick: String,
    title: String,
    content: String,
    date: String
}, {
    versionKey: false
});

module.exports = mongoose.model('food', foodSchema);