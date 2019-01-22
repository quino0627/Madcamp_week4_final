var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    nick: String,
    title: String,
    content: String,
    date: String
}, {
    versionKey: false
});

module.exports = mongoose.model('review', reviewSchema);