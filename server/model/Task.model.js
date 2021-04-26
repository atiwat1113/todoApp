const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskId: Number,
    name: String,
    dueDate: Date,
    user: String,
    done: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);
