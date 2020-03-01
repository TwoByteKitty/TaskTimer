var express = require('express');
var router = express.Router();
const tasksModel = require('../models/tasksModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  tasksModel.find({}).lean().exec((err, foundTasks) => {
    const foundTaskArr = Array.from(foundTasks);
    //Once passport is set up, the user will just be available
    req.user = { name: "User McUserson" };
    res.render('home', {
      user: req.user,
      tasks: foundTaskArr
    });
  });
});

module.exports = router;
