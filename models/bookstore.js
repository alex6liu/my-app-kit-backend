const mongoose = require('mongoose');

const bookstoreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  have: {
    type: Boolean,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
  },
  normalPrice: {
    type: Number,
    required: true,
  },
  buyPrice: {
    type: Number,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
});

const Bookstore = module.exports = mongoose.model('Bookstore', bookstoreSchema);