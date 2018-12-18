var express = require('express');
var router = express.Router();
const Bookstore = require('../models/bookstore');
const { check, validationResult } = require('express-validator/check');
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

router.get('/', (req, res, next) => {
  Bookstore.find({}, (err, books) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(books);
    }
  });

  if (req.body.tags) {
    Bookstore.find({tags:tags}, (err, books) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(books);
      }
    });
  }
});

router.post('/', (req, res, next) => {

  Bookstore.find({}, (err, books) => {
    if (err) {
      res.status(404).send(err);
    } else {
      let book = new Bookstore();
      book.name = req.body.name;
      book.author = req.body.author;
      book.have = req.body.have;
      book.read = req.body.read;
      book.normalPrice = parseFloat(req.body.normalPrice);
      book.buyPrice = parseFloat(req.body.buyPrice);
      book.tags = req.body.tags;

      book.save((err) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).send('Successfully add book');
        }
      });
    }
  });
});

router.get('/have', (req, res) => {
  Bookstore.find({have: true}, (err, books) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send({have: books.length});
    } 
  })
});
router.get('/read', (req, res) => {
  Bookstore.find({read: true}, (err, books) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send({read: books.length});
    } 
  })
});

router.get('/tags/:tag', (req, res) => {
  const tagKey = req.params.tag;
  const tagMap = {
    history: '历史',
    eco: '经济',
    cs: '计算机',
    novel: '小说',
    literture: '文学',
  }
  const tag = tagMap[tagKey];

  Bookstore.find({tags: tag }, (err, books) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send({[tagKey]: books.length});
    } 
  });
});

router.get('/:id', (req, res) => {
  Bookstore.findById(req.params.id, (err, book) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(book);
    }
  });
});

router.put('/:id', (req, res) => {
  Bookstore.findById(req.params.id, (err, book1) => {
    if (err) {
      res.status(404).send(err);
    } else {
      const book = {};
      if (req.body.name) {
        book.name = req.body.name;
      }
      if (req.body.author) {
        book.author = req.body.author;
      }
      if (req.body.have !== undefined) {
        book.have = req.body.have;
      }
      if (req.body.read !== undefined) {
        book.read = req.body.read;
      } 

      if (req.body.tags) {
        book.tags = req.body.tags;
      }
      if (req.body.normalPrice) {
        book.normalPrice = parseFloat(req.body.normalPrice);
      }
      if (req.body.buyPrice) {
        book.buyPrice = parseFloat(req.body.buyPrice);
      }

      Bookstore.update({"_id":req.params.id}, book, (err) => {
        if (err) {
          res.status(404).send(err);
        } else {
          Bookstore.findById(req.params.id, (err, book) => {
            res.status(200).send(book);
          });
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  Bookstore.findById(req.params.id, (err, book) => {
    if (err) {
      res.status(404).send(err);
    } else {
      Bookstore.deleteOne(book, (err) => {
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