var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//This will be hit via AJAX [/user/settings]
router.put('/settings',  function(req, res, next) {
  //Get user Model and Updates Accordingly. Example on Task.
  res.send('respond with a resource');
});

module.exports = router;
