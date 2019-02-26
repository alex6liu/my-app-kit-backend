var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const mongoAltasPassword = require('../password');
const Shoppingcart = require('../models/shoppingcart');

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
  Shoppingcart.find({}, (err, shoppings) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(shoppings);
    }
  });

});

router.post('/', (req, res, next) => {

  Shoppingcart.find({}, (err, shoppings) => {
    if (err) {
      res.status(404).send(err);
    } else {
      let shopping = new Shoppingcart();
      shopping.name = req.body.name;
      shopping.currentPrice = req.body.currentPrice;
      shopping.minPrice = req.body.minPrice;
      shopping.link = req.body.link;
      shopping.createTime = req.body.createTime;

      shopping.save((err) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).send('Successfully add shopping');
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  Shoppingcart.findById(req.params.id, (err, shopping) => {
    if (err) {
      res.status(404).send(err);
    } else {
      Shoppingcart.deleteOne(shopping, (err) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).send('Successfully delete');
        }
      });
    }
  });
});

module.exports = router;