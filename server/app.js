const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const helmet = require('helmet');
const passport = require('passport');
require('./config/passport');
const User = require('./model');
require('dotenv').config();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
/*
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
*/
app.use(passport.initialize());
app.use(helmet());

const jwtMW = exjwt({
  secret: process.env.JWT_SECRET
});

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", () => console.log("MongoDB connection error:"));


app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 12;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    const user = new User();
    user.username = username;
    user.password = hash;

    user.save((err, result) => {
      if (err) return res.json(err);
  
      console.log("User created: " + result);
      let token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' }); 
        return res.json({
          success: true,
          err: null,
          token
        });
    });
  })
})

app.post('/login', (req, res) => {
  passport.authenticate("local", {session: false}, (err, user) => {
    if (err) {
      res.json(false);
      return;
    }
    
    if (user) { 
      console.log("Valid!");
      let token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' }); 
        res.json({
          success: true,
          err: null,
          token
        });
    } else {
      res.status(401).json({
        success: false,
        token: null,
        err: 'Password and hash do not match!'
      });
    }
  })(req, res);
})

app.get('/', jwtMW, (req, res) => {
  console.log("Web Token Checked.")
 // res.send('You are authenticated'); 
});

module.exports = app;
