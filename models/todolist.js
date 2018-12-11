const mongoose = require('mongoose');

const todolistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createTime: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

const Todolist = module.exports = mongoose.model('Todolist', todolistSchema);