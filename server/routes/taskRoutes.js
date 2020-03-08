const express = require('express');
const router = express.Router();
const tasksModel = require('../models/tasksModel');

//Get all task view
router.get('/', function (req, res, next) {
  //Once passport is set up, the user will just be available
  req.user = { name: 'User McUserson' };
  tasksModel.find({}).lean().exec((err, foundTasks) => {
    const activeTitle = foundTasks.find(task => task.active).title;
    const incompleteTasks = foundTasks.filter(task => !task.completed);
    const completedTasks = foundTasks.filter(task => task.completed);
    res.render('tasks', {
      user: req.user,
      pendingTasks: {
        tasks: incompleteTasks,
        activeTitle
      },
      completedTasks: {
        tasks: completedTasks
      }
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
router.post('/:id', function (req, res, next) {
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

//set task active
router.put('/api/setactive/:id', function (req, res, next) {
  tasksModel.findOneAndUpdate({ active: true }, { active: false }, { new: true }, (err, task) => {
    if (err) {
      return res.status(500).json({
        message: 'Error when updating active status',
        error: err
      });
    }
    console.log(task)
    tasksModel.findByIdAndUpdate(req.params.id, { active: true }, { new: true }, (err, task) => {
      if (err) {
        return res.status(500).json({
          message: 'Error when setting to active',
          error: err
        });
      }
      res.json(task);
    });
  });

});

//mark task complete
router.put('/api/complete/:id', function (req, res, next) {
  tasksModel.findByIdAndUpdate(req.params.id, { completed: true }, { new: true }, (err, task) => {
    if (err) {
      return res.status(500).json({
        message: 'Error when marking complete',
        error: err
      });
    }
    res.json(task);
  });
});

module.exports = router;
