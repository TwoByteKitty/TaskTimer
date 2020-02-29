const express = require('express');
const router = express.Router();
const tasksModel = require('../models/tasksModel');

//If the tasks/* structure makes sense you dont need this.
router.get('/create', function (req, res, next) {
  res.render('createOrEditTask');
});

router.post('/create', function (req, res, next) {
  const task = new tasksModel({ ...req.body });

  task.save(function (err, task) {
    if (err) {
      return res.status(500).json({
        message: 'Error when creating task',
        error: err
      });
    }
    res.redirect('/')
  });
});

module.exports = router;
