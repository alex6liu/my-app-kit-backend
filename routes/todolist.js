var express = require('express');
var router = express.Router();
const Todolist = require('../models/todolist');
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
  Todolist.find({}, (err, todolists) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(todolists);
    }
  });
});

router.post('/',[
  check('name').isAlpha(),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Todolist.find({}, (err, todolists) => {
    if (err) {
      res.status(404).send(err);
    } else {
      let todolist = new Todolist();
      todolist.id = todolists.length + 1;
      todolist.name = req.body.name;

      todolist.save((err) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).send('Successfully add todo');
        }
      });
    }
  });
});

router.get('/:id', (req, res) => {
  Todolist.find({"id": parseInt(req.params.id)}, (err, todolist) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(todolist[0]);
    }
  });
});

router.put('/:id', (req, res) => {
  Todolist.find({"id":parseInt(req.params.id)}, (err, todolist) => {
    if (err) {
      res.status(404).send(err);
    } else {
      todolist.name = req.body.name;

      Todolist.update({}, todolist, (err) => {
        if (err) {
          res.status(404).send(err);
        } else {
          Todolist.find({'id':parseInt(req.params.id)}, (err, todolist) => {
            res.status(200).send(todolist);
          });
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  Todolist.find({"id":parseInt(req.params.id)}, (err, todolist) => {
    if (err) {
      res.status(404).send(err);
    } else {
      Todolist.deleteOne(todolist[0], (err) => {
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