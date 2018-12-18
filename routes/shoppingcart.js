var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const mongoAltasPassword = require('../password');

mongoose.connect(`mongodb://tknnn:${mongoAltasPassword}@backend-api-shard-00-00-kxfgn.mongodb.net:27017,backend-api-shard-00-01-kxfgn.mongodb.net:27017,backend-api-shard-00-02-kxfgn.mongodb.net:27017/test?ssl=true&replicaSet=backend-api-shard-0&authSource=admin&retryWrites=true`);
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