const generateTokenAndRedirect = (req, res, next, err, user) => {
  if (err) {
    return next(err);
  }
  if (user) {
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.redirect(`${req.query.state}?token=${token}`);
  } else {
    return res.redirect(`${req.query.state}`);
  }
};