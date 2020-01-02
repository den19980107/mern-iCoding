let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  displayName: {
    type: String
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    require: true
  },
  accountType: {
    type: String,
    require: true
  },
  accountId: {
    type: String
  }
})

let User = module.exports = mongoose.model('User', userSchema, 'user');