const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/User.model');
const db = 'mongodb+srv://todoAppGroup2:hightech@todo.v0rns.mongodb.net/todo?retryWrites=true&w=majority';

mongoose.connect(db);

router.get('/users', (req, res) => {
    User.find().exec((err, users) => {
        if(err){
            res.send('error has occured');
        } else{
            res.send(users);
        }
    })
});

// sign in
router.get('/:username/:password', (req, res) => {
    User.findOne({
        username: req.params.username,
        password: req.params.password
    }).exec((err, user) => {
        if(err){
            res.send('error has occured');
        } else {
            if(user === null){
                res.send('Invalid');
            }else {
                res.json(user);
            }
        }
    });
});

// sign up
router.post('/:username/:password', (req, res) => {
    let newUser = new User();

    newUser.username = req.params.username;
    newUser.password = req.params.password;

    newUser.save((err, user) => {
         if(err) {
            res.send(err.message);
        } else {
            res.send(user);
        }
    }); 

});

module.exports = router;