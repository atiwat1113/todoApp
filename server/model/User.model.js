var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    task: [{
        name: String,
        dueDate: Date,
        done: Boolean
    }]
});

module.exports = mongoose.model('User', UserSchema);
