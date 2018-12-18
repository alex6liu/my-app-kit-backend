var express = require('express');
var router = express.Router();
const Todolist = require('../models/todolist');
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
  Todolist.find({}, (err, todolists) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(todolists);
    }
  });
});

router.post('/', (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Todolist.find({}, (err, todolists) => {
    if (err) {
      res.status(404).send(err);
    } else {
      let todolist = new Todolist();    
      todolist.name = req.body.name;
      todolist.createTime = req.body.createTime;
      todolist.completed = req.body.completed;

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
  Todolist.findById(req.params.id, (err, todolist) => {
    console.log(req.params.id)
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(todolist);
    }
  });
});

router.put('/:id', (req, res) => {
  Todolist.findById(req.params.id, (err, todolist1) => {
    if (err) {
      res.status(404).send(err);
    } else {
      const todolist = {};
      if (req.body.name) {
        todolist.name = req.body.name;
      }

      if (req.body.createTime) {
        todolist.createTime = req.body.createTime;
      }

      if (req.body.completed !== undefined) {
        todolist.completed = req.body.completed;
      }

      Todolist.update({"_id": req.params.id}, todolist, (err) => {
        if (err) {
          res.status(404).send(err);
        } else {
          Todolist.findById(req.params.id, (err, todolist) => {
            res.status(200).send(todolist);
          });
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  Todolist.findById(req.params.id, (err, todolist) => {
    if (err) {
      res.status(404).send(err);
    } else {
      Todolist.deleteOne(todolist, (err) => {
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