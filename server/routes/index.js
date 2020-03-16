var express = require('express');
var router = express.Router();
const tasksModel = require('../models/tasksModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  tasksModel
    .find({ completed: false })
    .lean()
    .exec((err, foundTasks) => {
      let taskData = {
        tasks: false,
        activeTitle: 'None'
      };
      if (foundTasks.length > 0) {
        taskData.activeTitle = foundTasks.find(task => task.active).title;
        taskData.tasks = foundTasks;
      }
      //Once passport is set up, the user will just be available
      req.user = { name: 'User McUserson' };
      res.render('home', {
        user: req.user,
        taskData
      });
    });
});

module.exports = router;
