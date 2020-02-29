var express = require('express');
var router = express.Router();

router.get('/tasks', function(req, res, next) {
  res.render('tasks', {page: "tasks"});
});


module.exports = router;
