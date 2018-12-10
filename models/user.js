const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const User = module.exports = mongoose.model('User', userSchema);