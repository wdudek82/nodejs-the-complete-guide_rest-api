const { validationResult } = require('express-validator/check');
const { errorHandler, validationError } = require('../utils/error-handler');

const { Post } = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({ message: 'Fetched posts successfully.', posts });
    })
    .catch((err) => errorHandler(err, next));
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  if (!req.file) {
    const error = new Error('No image provided!');
    error.statusCode = 422;
    throw error;
  }

  // validationError('No image provided!');

  const { title, content } = req.body;
  const { path } = req.file;

  const post = new Post({
    title,
    imageUrl: path,
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
    .catch((err) => errorHandler(err, next));
};

exports.getPost = (req, res, next) => {
  const { id } = req.params;

  Post.findById(id)
    .then((post) => {
      console.log(post);

      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ message: `Post with id ${id} found!`, post });
    })
    .catch((err) => errorHandler(err, next));
};

exports.deletePost = (req, res, next) => {
  const { id } = req.params;

  Post.deleteOne({ _id: id })
    .then((result) => {
      res
        .status(200)
        .json({ message: `Successfully deleted post with id ${id}`, result });
    })
    .catch((err) => errorHandler(err, next));
};
