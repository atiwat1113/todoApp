const express = require('express');
const router = express.Router();
const User = require('../model/User.model');

// --------------Get--------------

router.get('/', (req, res) => {
    if(req.user.username) {
        User.findOne({username: req.user.username}, (err, user) => {
            if(err) throw err;
            if(!user) res.send('cannot find user');
            else {
                res.send(user.task);
            }
        })
    } else {
        res.send('not log in yet');
    }
});

// --------------Post--------------


// --------------Put--------------
router.put('/update', async (req, res) => {
    let doc = await User.findOne({username: req.user.username});
    if(!doc){
        console.log('cannot find user');
        res.send('');
    }
    let task = doc.task.id(req.body.id);
    if(task) {
        task.name = req.body.name;
        task.dueDate = req.body.dueDate;
        task.done = req.body.done;
        await task.save();
        res.send(task);
    } else {
        console.log('Task not found');
        res.send('');
    }
   
});

router.put('/add',async (req, res) => {
    console.log(req.session);
    let doc = await User.findOne({username: req.user.username},(err,user) => {
        if(err) throw err;
        if(!user) {
            console.log('cannot find user');
            res.send('');
        }
    });
    let newTask = {
        name: req.body.name,
        dueDate: req.body.dueDate,
        done: false
    };

    doc.task.push(newTask);
    await doc.save();
    res.send(newTask);

    
});

router.put('/delete', async (req, res) => {
    let doc = await User.findOne({username: req.user.username}, (err, user) => {
        if(err) throw err;
    });
    if(!doc){
        console.log('cannot find user');
        res.send('');
    }else {
        const deletedTaskIndex = doc.task.findIndex(eachTask => eachTask._id.toString() === req.body.id);
        if(deletedTaskIndex != -1){
            const deletedTask = doc.task[deletedTaskIndex];
            for(let i = deletedTaskIndex; i<doc.task.length-1;i++){
                doc.task[i] = doc.task[i+1];
            } 
            doc.task.pop();
            await doc.save();
            res.send(deletedTask);
        } else {
            console.log('cannot find task');
            res.send('');
        }
    }

    
   
});

// --------------Delete--------------


module.exports = router;