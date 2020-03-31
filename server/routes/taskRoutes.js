const express = require('express');
const router = express.Router();
const tasksModel = require('../models/tasksModel');
const userModel = require('../models/userModel');

//Get all task view
router.get('/', function(req, res, next) {
  //Once passport is set up, the user will just be available
  req.user = {
    _id: '5e8293ec83454b62f895935d'
  };
  userModel
    .findOne({ _id: req.user._id })
    .lean()
    .exec((err, foundUser) => {
      const activeTitle = '';

      res.render('tasks', {
        user: foundUser,
        title: 'Task Search',
        tasks: {
          tasks: foundUser.tasks,
          activeTitle
        }
      });
    });
});

//Get Create View
router.get('/create', function(req, res, next) {
  //Once passport is set up, the user will just be available
  req.user = {
    _id: '5e8293ec83454b62f895935d'
  };
  userModel
    .findOne({ _id: req.user._id })
    .lean()
    .exec((err, foundUser) => {
      console.log(foundUser);
      res.render('createOrEditTask', {
        user: foundUser,
        title: 'Create New Task'
      });
    });
});

//Send New Task to be created in db
router.post('/create', function(req, res, next) {
  const task = { ...req.body };
  req.user = {
    _id: '5e8293ec83454b62f895935d'
  };
  userModel
    .findByIdAndUpdate(
      { _id: req.user._id },
      { new: true, upsert: true, $push: { tasks: task } }
    )
    .then(foundUser => {
      res.redirect('/');
    });
});

//Get Edit View
router.get('/:id', function(req, res, next) {
  //Once passport is set up, the user will just be available
  req.user = {
    _id: '5e8293ec83454b62f895935d'
  };
  userModel
    .findById(req.user._id)
    .then(user => {
      const task = user.tasks.id(req.params.id);
      delete user.password;
      res.render('createOrEditTask', {
        user: user.toObject(),
        title: 'Edit Task',
        task: task.toObject()
      });
    })
    .catch(err => res.status(500).json(err));
});

//Send updates back to server to be saved to db
router.post('/:id', function(req, res, next) {
  req.user = {
    _id: '5e8293ec83454b62f895935d'
  };
  userModel
    .findById(req.user._id)
    .then(user => {
      const task = user.tasks.id(req.params.id);
      task.title = req.body.title;
      task.description = req.body.description;
      task.priority = req.body.priority;
      user.save().then(user => {
        res.redirect('/');
      });
    })
    .catch(err => res.status(500).json(err));
});

//set task active
router.put('/api/setactive/:id', function(req, res, next) {
  req.user = {
    _id: '5e8293ec83454b62f895935d'
  };
  userModel
    .findById(req.user._id)
    .then(user => {
      user.tasks.forEach(task => (task.active = false));
      const task = user.tasks.id(req.params.id);
      task.active = true;
      user.save().then(user => {
        delete user.password;
        res.json(task);
      });
    })
    .catch(err => res.status(500).json(err));
});

//mark task complete
router.put('/api/complete/:id', function(req, res, next) {
  req.user = {
    _id: '5e8293ec83454b62f895935d'
  };
  userModel
    .findById(req.user._id)
    .then(user => {
      const task = user.tasks.id(req.params.id);
      task.completed = true;
      task.dateCompleted = req.query.dateCompleted;
      user.save().then(user => {
        delete user.password;
        res.json(task);
      });
    })
    .catch(err => res.status(500).json(err));
});

//add time to ask
//:id = task id
// send time on query string time=[milliseconds? probably best] Moment works best with them.
router.put('/api/add-time/:id', function(req, res, next) {
  req.user = {
    _id: '5e8293ec83454b62f895935d'
  };
  userModel
    .findById(req.user._id)
    .then(user => {
      const task = user.tasks.id(req.params.id);
      task.timeSpent += req.query.time;
      user.save().then(user => {
        delete user.password;
        res.json(task);
      });
    })
    .catch(err => res.status(500).json(err));
});
module.exports = router;
