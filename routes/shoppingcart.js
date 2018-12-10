var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/all_the_backend');
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connect to db');
});

db.on('error', (err) => {
  console.log(err);
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;