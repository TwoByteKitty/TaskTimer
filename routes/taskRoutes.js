const express = require('express');
const router = express.Router();
const tasksModel = require('../models/tasksModel');

//Get all task view
router.get('/', function(req, res, next) {
  //Once passport is set up, the user will just be available
  req.user = { name: 'User McUserson' };
  res.render('tasks', { user: req.user });
});

//Get Create View
router.get('/create', function(req, res, next) {
  //Once passport is set up, the user will just be available
  req.user = { name: 'User McUserson' };
  res.render('createOrEditTask', { user: req.user });
});

//Send New Task to be created in db
router.post('/create', function(req, res, next) {
  const task = new tasksModel({ ...req.body });

  task.save(function(err, task) {
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
router.get('/:id', function(req, res, next) {
  //Once passport is set up, the user will just be available
  req.user = { name: 'User McUserson' };
  tasksModel.findById(req.params.id, (err, foundTask) => {
    res.render('createOrEditTask', {
      user: req.user,
      task: foundTask,
      helpers: {
        JSON: obj => JSON.stringify(obj) //This is a helper to see an object as a string on the page from handlebars.
      }
    });
  });
});

//Send updates back to server to be saved to db
router.put('/:id', function(req, res, next) {
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
