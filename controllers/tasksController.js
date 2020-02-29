const tasksModel = require('../models/tasksModel.js');




module.exports = {
    findOne: function (request, response){
        const id = request.params.id;
        tasksModel.findOne({_id: id}, function(error, task) {
            if (error) {
                return response.status(500).json({
                    message: 'Error when getting task.',
                    error: err
                });
            }
            if (!task) {
                return res.status(404).json({
                    message: 'No such task'
                });
            }
            return res.json(workoutRoutine);
        });
    },

    findAll: function (request, response){

    },

    create: function (request, response){

    },

    update: function (request, response){

    },

    remove: function (request, response){

    }
}