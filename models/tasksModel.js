var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var taskSchema = new Schema({
	'title' : String,
    'description' : String,
    'priorityLvl' : Number,
    'dateCreated' : String
});

module.exports = mongoose.model('tasks', taskSchema);
