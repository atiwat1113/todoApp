const express = require('express');
const router = express.Router();
const User = require('../model/User.model');

// --------------Get--------------

router.get('/', (req, res) => {
    if(req.user.username) {
        console.log(req.user.task);
        res.json(req.user.task);
    } else {
        res.send('not log in yet');
    }
});

// --------------Post--------------


// --------------Put--------------
router.put('/update', (req, res) => {
   let tasks = req.user.task;
   let updatedTaskIndex = tasks.findIndex(task => task.id === req.body.id);
   if(updatedTaskIndex !== -1){
        let updatedTask = tasks[updatedTaskIndex];

        updatedTask.name = req.body.name;
        updatedTask.dueDate = req.body.dueDate;
        updatedTask.done = req.body.done;
    
        tasks[updatedTaskIndex] = updatedTask;

        res.send(updatedTask);
    } else {
        console.log('Task not found');
        res.send('');
    }
   
});

router.put('/add',async (req, res) => {
    let tasks;
    let doc = await User.findOne({username: req.user.username},(err,user) => {
        if(err) throw err;
        if(!user) res.send('');
        else {
            tasks = user.task;
        }
    });

    let newTask = {
        name: req.body.name,
        dueDate: req.body.dueDate,
        done: false
    };

    tasks.push(newTask);

    doc.task = tasks;
    await doc.save();
    res.json(doc);

    
});

// --------------Delete--------------
router.delete('/delete', (req, res) => {
    let tasks = req.user.task;
   let deletedTaskIndex = tasks.findIndex(task => task.id === req.body.id);
   if(deletedTaskIndex !== -1){
        let deletedTask = tasks[deletedTaskIndex];
        let task = tasks[0];

        tasks[0] = deletedTask;
        tasks[deletedTaskIndex] = task;
        tasks.shift();

        res.send(deletedTask)
        res.status(200);
    } else {
        console.log('Task not found');
        res.status('');
    }
});

module.exports = router;