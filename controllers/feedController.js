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
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect.',
      errors: errors.array(),
    });
  }

  const { title, content } = req.body;

  const post = new Post({
    title,
    imageUrl: 'images/unicorn.jpg',
    content,
    creator: { name: 'Max' },
  });

  console.log('Foo');

  return post
    .save()
    .then((result) => {
      // console.log('Result', result);
      return res.status(201).json({
        message: 'Post created successfully!',
        post: result,
      });
    })
    .catch(console.log);
};
