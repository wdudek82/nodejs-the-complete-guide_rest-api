const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator/check');
const { errorHandler, validationError } = require('../utils/error-handler');

const { Post } = require('../models/postModel');
const { User } = require('../models/userModel');

exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;

  Post.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;

      return Post.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((posts) => {
      res
        .status(200)
        .json({ message: 'Fetched posts successfully.', posts, totalItems });
    })
    .catch((err) => errorHandler(err, next));
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    validationError('Validation failed, entered data is incorrect.');
  }

  if (!req.file) {
    validationError('No image provided!');
  }

  const { title, content } = req.body;
  const imageUrl = req.file.path;
  let creator;

  const post = new Post({
    title,
    imageUrl,
    content,
    creator: req.userId,
  });

  return post
    .save()
    .then(() => {
      return User.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then(() => {
      return res.status(201).json({
        message: 'Post created successfully!',
        post,
        creator: { _id: creator._id, name: creator.name },
      });
    })
    .catch((err) => errorHandler(err, next));
};

exports.getPost = (req, res, next) => {
  const { id } = req.params;

  Post.findById(id)
    .then((post) => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({ message: `Post with id ${id} found!`, post });
    })
    .catch((err) => errorHandler(err, next));
};

function clearImage(filePath) {
  const fullFilePath = path.resolve(filePath);
  fs.unlink(fullFilePath, (err) => console.log(err));
}

exports.updatePost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    validationError('Validation failed, entered data is incorrect.');
  }

  const { id } = req.params;
  const { title, content, image } = req.body;

  let imageUrl = image;

  if (req.file) {
    imageUrl = req.file.path;
  }

  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }

  return Post.findById(id)
    .then((post) => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }

      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }

      if (imageUrl !== post.imageUrl) {
        clearImage(post.imageUrl);
      }

      const updPost = post;

      updPost.title = title;
      updPost.content = content;
      updPost.imageUrl = imageUrl;

      return updPost.save();
    })
    .then((result) => {
      res.status(200).json({
        message: 'Post has been updated successfully.',
        post: result,
      });
    })
    .catch((err) => errorHandler(err, next));
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.id;

  Post.findById(postId)
    .then((post) => {

      if (post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }

      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }

      clearImage(post.imageUrl);

      return Post.findByIdAndRemove(postId);
    })
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.posts.pull(postId);
      user.save();
    })
    .then(() => {
      res
        .status(200)
        .json({ message: `Successfully deleted post with id ${postId}` });
    })
    .catch((err) => errorHandler(err, next));
};
