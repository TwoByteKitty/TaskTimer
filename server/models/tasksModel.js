//To embed on user to make pulling them easier.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
	title : String,
    description : String,
    priorityLvl : Number,
    dateCreated : String,
    timeSpent: Number,
    active: {type: Boolean, default: false},
    completed: {type: Boolean, default: false},
    dateCompleted : String
});

module.exports = mongoose.model('tasks', taskSchema);
