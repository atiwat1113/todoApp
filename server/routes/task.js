const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../model/Task.model');
const db = 'mongodb+srv://todoAppGroup2:hightech@todo.v0rns.mongodb.net/todo?retryWrites=true&w=majority';

mongoose.connect(db);

router.get('/', (req, res) => {
    Task.find().exec((err, tasks) => {
        if(err){
            res.send('error has occured: ' + err);
        } else {
            res.send(tasks);
        }
    });
});

router.post('/', (req, res) => {
    let newTask = new Task();

    newTask.name = req.body.name;
    newTask.dueDate = req.body.dueDate;
    newTask.user = req.body.user;
    newTask.done = req.body.done;

    newTask.save((err, task) => {
        if(err) {
            res.send('error creating a new task: ' + err);
        } else {
            res.send(task);
        }
    })
})

module.exports = router;