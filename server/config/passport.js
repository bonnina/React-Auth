const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require('../model');

passport.use(new LocalStrategy(
  function(name, password, done) {
    User.findOne({ username: name }, (err, user) => {
      console.log('User '+ name +' attempted to log in.');
      if (err) { 
        return done(err); 
      }
      if (!user) { 
        return done(null, false); 
      }
      if (!bcrypt.compareSync(password, user.password)) { 
        return done(null, false); 
      }
      return done(null, user);
    });
  }
));