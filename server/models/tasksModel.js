//To embed on user to make pulling them easier.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title : String,
    description : String,
    priorityLvl : Number,
    dateCreated : String,
    timeSpent: Number,
    active: {type: Boolean, default: false},
    completed: {type: Boolean, default: false},
    dateCompleted : String
});
const Task = mongoose.model('tasks', taskSchema);

module.exports = {
    Task,
    taskSchema
}
