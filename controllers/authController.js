// controllers/authController.js
const passport = require('passport');
const db = require('../models');

module.exports = (app) => {
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup'
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
  }));

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Additional authentication middleware and routes can be added as needed
};
