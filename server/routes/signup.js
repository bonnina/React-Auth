const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel');

router.post('/', (req, res, next) => {
  const { username, password } = req.body;
  const saltRounds = 12;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    const user = new User();
    user.username = username;
    user.password = hash;

    user.save((err, result) => {
      if (err) return res.json(err);
  
      let token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' }); 
        return res.json({
          success: true,
          err: null,
          token
        });
    });
  })
});

module.exports = router;