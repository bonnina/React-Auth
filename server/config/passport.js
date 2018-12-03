const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Social = require('../models/socialModel');

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

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: process.env.FB_CALLBACK_URL,
      profileFields: ["id", "name"]
    },
    (accessToken, refreshToken, profile, done) =>
      findUserOrCreate(profile, done)
  )
);

const findUserOrCreate = (profile, done) => {
  Social.findOne({ username: `${profile.name.givenName} ${profile.name.familyName}` }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      const newUser = new Social();
      newUser.username = `${profile.name.givenName} ${profile.name.familyName}`;

      newUser.save((err, newUser) => {
        if (err) return done(err);
        return done(null, newUser);
      });
    } else {
      return done(null, user);
    }
  });
};