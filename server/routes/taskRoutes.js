const express = require('express');
const router = express.Router();
const tasksModel = require('../models/tasksModel');

//Get all task view
router.get('/', function (req, res, next) {
  //Once passport is set up, the user will just be available
  req.user = { name: 'User McUserson' };
  tasksModel.find({}).lean().exec((err, foundTasks) => {
    const foundTaskArr = Array.from(foundTasks);
    res.render('tasks', { 
      user: req.user,
      tasks: foundTaskArr
    });
  })
  
});

//Get Create View
router.get('/create', function (req, res, next) {
  //Once passport is set up, the user will just be available
  req.user = { name: 'User McUserson' };
  res.render('createOrEditTask', { user: req.user });
});

//Send New Task to be created in db
router.post('/create', function (req, res, next) {
  const task = new tasksModel({ ...req.body });

  task.save(function (err, task) {
    if (err) {
      return res.status(500).json({
        message: 'Error when creating task',
        error: err
      });
    }
    res.redirect('/');
  });
});

//Get Edit View
router.get('/:id', function (req, res, next) {
  //Once passport is set up, the user will just be available
  req.user = { name: 'User McUserson' };
  tasksModel.findOne({ _id: req.params.id }, (err, foundTask) => {
    res.render('createOrEditTask', {
      user: req.user,
      task: foundTask.toObject()
    });
  });
});

//Send updates back to server to be saved to db
router.put('/:id', function (req, res, next) {
  tasksModel.findByIdAndUpdate(req.params.id, { ...req.body }, (err, task) => {
    if (err) {
      return res.status(500).json({
        message: 'Error when creating task',
        error: err
      });
    }
    res.redirect('/');
  });
});

module.exports = router;
