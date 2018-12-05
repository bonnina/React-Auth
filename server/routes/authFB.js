const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport');
const generateTokenAndRedirect = require('../methods/tokenAndRedirect');

router.get("/", (req, res, next) => {
  passport.authenticate("facebook", {
    state: req.query.link
  })(req, res, next);
});

router.get("/callback", (req, res, next) => {
  passport.authenticate("facebook", (err, user, info) =>
    generateTokenAndRedirect(req, res, next, err, user, info)
  )(req, res, next);
});

module.exports = router;