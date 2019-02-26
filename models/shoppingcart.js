const mongoose = require('mongoose');
require('mongoose-type-email');

const shoppingcartSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  minPrice: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  createTime: {
    type: String,
    required: true,
  },
});

const Shoppingcart = module.exports = mongoose.model('Shoppingcart', shoppingcartSchema);