const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createTime: {
    type: String,
    required: true,
  },
  mainContent: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
});

const Post = module.exports = mongoose.model('Post', postSchema);