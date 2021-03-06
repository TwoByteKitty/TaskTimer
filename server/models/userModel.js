//Need to embed task for easier searching and saving
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var { taskSchema } = require('./tasksModel');

var UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'First and last name is required'
    },
    email: {
      type: String,
      trim: true,
      required: 'Email address is required'
    },
    password: {
      type: String,
      trim: true,
      required: 'A password is required',
      validate: [
        function (input) {
          return input.length >= 4;
        },
        'Password should be four characters or longer'
      ]
    },
    settings: {
      workTime: { type: Number, default: 30 },
      breakTime: { type: Number, default: 5 },
      volume: { type: Number, default: 50 },
      alarm: { type: String, default: "air_raid" }
    },
    tasks: [taskSchema]
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

class newUser {
  constructor({ _id, fullName, email, password, settings, tasks }) {
    this._id = _id;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.settings = settings;
    this.tasks = tasks;
  }

  comparePassword(challenge) {
    return bcrypt.compare(challenge, this.password);
  }
}

UserSchema.loadClass(newUser);
let User = mongoose.model('User', UserSchema);

module.exports = User;
