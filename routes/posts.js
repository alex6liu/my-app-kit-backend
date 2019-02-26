var express = require('express');
var router = express.Router();
const Post = require('../models/posts');
const { check, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const mongoAltasPassword = process.env.password && require('../password');

mongoose.connect(`mongodb://tknnn:${mongoAltasPassword}@backend-api-shard-00-00-kxfgn.mongodb.net:27017,backend-api-shard-00-01-kxfgn.mongodb.net:27017,backend-api-shard-00-02-kxfgn.mongodb.net:27017/test?ssl=true&replicaSet=backend-api-shard-0&authSource=admin&retryWrites=true`);
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connect to db');
});

db.on('error', (err) => {
  console.log(err);
});

router.get('/', (req, res, next) => {
  Post.find({}, (err, posts) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(posts);
    }
  });
});

router.post('/', (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Post.find({}, (err, posts) => {
    if (err) {
      res.status(404).send(err);
    } else {
      let post = new Post();    
      post.title = req.body.title;
      post.createTime = req.body.createTime;
      post.mainContent = req.body.mainContent;
      post.tags = req.body.tags;

      post.save((err) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).send('Successfully add post');
        }
      });
    }
  });
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    console.log(req.params.id)
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(post);
    }
  });
});

router.put('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post1) => {
    if (err) {
      res.status(404).send(err);
    } else {
      const post = {};
      if (req.body.name) {
        post.name = req.body.name;
      }

      if (req.body.createTime) {
        post.createTime = req.body.createTime;
      }

      if (req.body.mainContent !== undefined) {
        post.mainContent = req.body.mainContent;
      }

      if (req.body.tags !== undefined) {
        post.tags = req.body.tags;
      }

      Post.update({"_id": req.params.id}, post, (err) => {
        if (err) {
          res.status(404).send(err);
        } else {
          Post.findById(req.params.id, (err, post) => {
            res.status(200).send(post);
          });
        }
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      res.status(404).send(err);
    } else {
      Post.deleteOne(post, (err) => {
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