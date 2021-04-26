const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../model/Task.model');
const db = 'mongodb+srv://todoAppGroup2:hightech@todo.v0rns.mongodb.net/todo?retryWrites=true&w=majority';

mongoose.connect(db);

// --------------Get--------------
router.get('/all', (req, res) => {
    Task.find().exec((err, tasks) => {
        if(err){
            res.send('error has occured: ' + err.message);
        } else {
            res.send(tasks);
        }
    });
});

router.get('/', (req, res) => {
    Task.find({user: req.session.username}).exec((err, tasks) => {
        if(err){
            res.send('error has occured: ' + err.message);
        } else {
            res.send(tasks);
        }
    });
});

// --------------Post--------------
router.post('/', (req, res) => {
    let newTask = new Task();

    newTask.name = req.body.name;
    newTask.dueDate = req.body.dueDate;
    newTask.user = req.session.username;
    newTask.done = req.body.done;
    console.log(req.session.username);

    newTask.save((err, task) => {
        if(err) {
            res.send('error creating a new task: ' + err.message);
        } else {
            res.send(task);
        }
    });
});

// --------------Put--------------
router.put('/:id', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.id
    }, {$set: 
    {
        name: req.body.name,
        dueDate: req.body.dueDate,
        done: req.body.done
    }},
    {upsert: false},
    (err, newTask) => {
        if(err){
            res.send('error has occured: ' + err.message);
        } else {
            res.send(newTask);
        }
    });
});

// --------------Delete--------------
router.delete('/:id', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.id
    }, (err, deletedTask) => {
        if(err){
            res.send('error deleting task: ' + err.message);
        } else {
            res.send(deletedTask);
        }
    });
});

module.exports = router;