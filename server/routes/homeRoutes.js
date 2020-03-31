
var express = require('express');
var router = express.Router();
const tasksModel = require('../models/tasksModel');
const userModel = require('../models/userModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  req.user = {
    _id: '5e8293ec83454b62f895935d'
  }
  userModel.findOne({ _id: req.user._id }).lean().exec((err, foundUser) => {
    let taskData = {
      tasks: false,
      activeTitle: 'None'
    };
    //Need to do this in Task List too
    if (foundUser.tasks.length > 0) {
      const activeTask = foundUser.tasks.find(task => task.active);
      taskData.activeTitle = activeTask ? activeTask.title : 'No active task';
      taskData.tasks = foundUser.tasks.filter(task => !task.completed);
    }
    res.render('home', {
      user: foundUser,
      title: 'TaskTimer',
      taskData
    });
  });
});

module.exports = router;
