const { validationResult } = require('express-validator/check');

const { Post } = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(console.log);
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const { title, content } = req.body;

  const post = new Post({
    title,
    imageUrl: 'images/unicorn.jpg',
    content,
    creator: { name: 'Max' },
  });

  return post
    .save()
    .then((result) => {
      return res.status(201).json({
        message: 'Post created successfully!',
        post: result,
      });
    })
    .catch((err) => {
      const updErr = err;
      if (!updErr.statusCode) {
        updErr.statusCode = 500;
      }

      next(updErr);
    });
};

exports.getPost = (req, res, next) => {
  const { id } = req.params;

  Post.findById({ id })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: `Post with id ${id} found!`, result });
    })
    .catch(console.log);
};

exports.deletePost = (req, res, next) => {
  const { id } = req.params;

  Post.deleteOne({ _id: id })
    .then((result) => {
      res
        .status(200)
        .json({ message: `Successfully deleted post with id ${id}`, result });
    })
    .catch(console.log);
};
