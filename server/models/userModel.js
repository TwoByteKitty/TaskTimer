var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	name : String,
    email : String,
    password : String,
    settings : {
        workTime: {type: Number, default: 30},
        breakTime: {type: Number, default: 5},
        volume: {type: Number, default: 50},
        alarm: String
    }

});

module.exports = mongoose.model('user', userSchema);
