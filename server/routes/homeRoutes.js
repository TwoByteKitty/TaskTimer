
var express = require('express');
var router = express.Router();
const tasksModel = require('../models/tasksModel');
const userModel = require('../models/userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  req.user = {
    _id: '5e757dd0a02a924a34b08754',
    settings: {
      workTime: 30,
      breakTime: 5,
      volume: 50,
      alarm: 'air_raid'
    },
    name: 'Allie Payne'
  };
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

      res.render('home', {
        user: req.user,
        title: 'TaskTimer',
        taskData
      });
    });
});

module.exports = router;
