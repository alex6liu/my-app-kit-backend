const mongoose = require('mongoose');
require('mongoose-type-email');

const shoppingcartSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  currPrice: {
    type: Number,
    required: true,
  },
  minPrice: {
    type: Number,
    required: true,
  }
});

const Shoppingcart = module.exports = mongoose.model('Shoppingcart', userSchema);