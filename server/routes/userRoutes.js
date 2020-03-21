const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//This will be hit via AJAX [/user/settings]
router.post('/settings', function (req, res, next) {
  console.log(req.body);
});


router.get('/register', function (req, res, next) {
  res.render('registration', {layout: 'unauth.hbs'});
});


router.post('/register', function (req, res, next) {
  const user = new userModel({ ...req.body });
  user.save(function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Error when creating task',
        error: err
      });
    }
    console.log(user);
    res.redirect('/');
  })
});

module.exports = router;
