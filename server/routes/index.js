var express = require('express');
var router = express.Router();
const tasksModel = require('../models/tasksModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  tasksModel.find({ completed: false }).lean().exec((err, foundTasks) => {
    //Once passport is set up, the user will just be available
    const activeTitle = foundTasks.find(task => task.active).title;
    req.user = { name: "User McUserson" };
    res.render('home', {
      user: req.user,
      taskData: {
        tasks: foundTasks,
        activeTitle
      }
    });
  });
});

module.exports = router;
