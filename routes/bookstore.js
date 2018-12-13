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
      book.name = req.body.name;
      book.author = req.body.author;
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