const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// model
const Admin = require('../models/Admin');

module.exports = (passport) => {


  passport.use(
    new LocalStrategy({ usernameField: 'login', passwordField: 'password' }, (login , password, done) => {
      // Match admin in DB
      Admin.findOne({ login: login })
        .then(user => {

          if(!user) {
            return done(null, false, { message: 'Credentials are incorrect!' });
          }

          // Match the password
          bcrypt.compare(password, user.password, (err, isMatched) => {
            if(err) throw err;

            if(isMatched) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Credentials are incorrect!' });
            }

          });

          // if(password == user.password) {
          //   return done(null, user);
          // } 
          // else {
          //   return done(null, false, { message: 'User\'s credentials are incorrect!' });
          // }

        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, user) => {
      done(err, user);
    });
  });


};