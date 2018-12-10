var express = require('express');
var router = express.Router();
const Bookstore = require('../models/bookstore');
const { check, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/all_the_backend');
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
});

router.post('/', (req, res, next) => {

  Bookstore.find({}, (err, books) => {
    if (err) {
      res.status(404).send(err);
    } else {
      let book = new Bookstore();
      book.id = books.length + 1;
      book.name = req.body.name;
      book.have = req.body.have;
      book.read = req.body.read;
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

router.get('/:id', (req, res) => {
  Bookstore.find({"id": parseInt(req.params.id)}, (err, book) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(book[0]);
    }
  });
});

router.put('/:id', (req, res) => {
  Bookstore.find({"id":parseInt(req.params.id)}, (err, book) => {
    if (err) {
      res.status(404).send(err);
    } else {
      if (req.body.name) {
        book.name = req.body.name;
      }
      if (req.body.have) {
        book.have = req.body.have;
      }
      if (req.body.read) {
        book.read = req.body.read;
      }
      if (req.body.tags) {
        book.tags = req.body.tags;
      }

      Bookstore.update({}, book, (err) => {
        if (err) {
          res.status(404).send(err);
        } else {
          Bookstore.find({'id':parseInt(req.params.id)}, (err, book) => {
            res.status(200).send(book);
          });
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  Bookstore.find({"id":parseInt(req.params.id)}, (err, book) => {
    if (err) {
      res.status(404).send(err);
    } else {
      Bookstore.deleteOne(book[0], (err) => {
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