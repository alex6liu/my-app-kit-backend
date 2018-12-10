const mongoose = require('mongoose');
require('mongoose-type-email');

const bookstoreSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
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
  tags: {
    type: Array,
    required: true,
  },
});

const Bookstore = module.exports = mongoose.model('Bookstore', bookstoreSchema);