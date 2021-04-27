const User = require('./model/User.model');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

    passport.use(
        new localStrategy((username, password, done) => {
            User.findOne({username: username}, (err, user) => {
                if(err) throw err;
                if(!user) return done(null, false); // done(error, user) -> error = null and user = false
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) throw err;
                    if(result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false)
                    }
                });
            });
        })
    );

    passport.serializeUser((user,cb) => { // store cookies inside browser
        cb(null, user.id); // create a cookie with user id inside
    });
    passport.deserializeUser((id,cb) => { //get user id from a cookie
        User.findOne({_id: id}, (err,user) => {
            const userInformation = {
                username: user.username
            };
            cb(err, userInformation);
        });
    });
};