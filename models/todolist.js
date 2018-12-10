const mongoose = require('mongoose');
require('mongoose-type-email');

const todolistSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Todolist = module.exports = mongoose.model('Todolist', todolistSchema);