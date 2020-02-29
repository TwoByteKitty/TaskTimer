var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //Once passport is set up, the user will just be available
  req.user = { name: "User McUserson"};
  res.render('home', { user: req.user });
});

module.exports = router;
