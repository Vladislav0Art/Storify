const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// model
const Admin = require('../../models/Admin');

// specify router
const router = express.Router();


// @route POST /secret/adminlogin
// @descr login for admin
// @access Public
router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // console.log(user);

    if (err) {
       return next(err);
    }

    if (!user) {
      // console.log(info);
      return res.status(403).send(info.message); 
    }

    req.logIn(user, (err) => {
      if (err) { 
        return next(err); 
      }
      return res.send('Success');
    });
  })(req, res, next);
});

module.exports = router;