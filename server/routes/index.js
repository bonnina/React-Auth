const express = require('express');
const router = express.Router();
const exjwt = require('express-jwt');

const jwtMW = exjwt({
  secret: process.env.JWT_SECRET
});

router.get('/', jwtMW, (req, res) => {
  res.send('Web Token Checked'); 
});

module.exports = router;
