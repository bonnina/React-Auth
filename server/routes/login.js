const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();
require('../config/passport');

router.post('/', (req, res) => {
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

module.exports = router;