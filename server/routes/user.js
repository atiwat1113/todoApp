const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User.model');
const passport = require('passport');

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
router.post('/login', (req, res, next) => {
    console.log('yes');
    passport.authenticate('local', (err, user, info) => {
        if(err) throw err;
        if(!user) res.send(404);
        else { 
            req.logIn(user, err => {
                if(err) throw err;
                res.send(req.user);
            });
        }
    })(req, res, next);
});

// sign up
router.post('/register', (req, res) => {
    User.findOne({username: req.body.username}, async (err,doc) => {
        if(err) throw err;
        if(doc) res.send('User Already Exists');
        if(!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                task: []
            });
            await newUser.save();
            res.send(newUser);
        }
    });

});

module.exports = router;