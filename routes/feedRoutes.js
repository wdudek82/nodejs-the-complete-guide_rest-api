const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feedController');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// GET /feed/post/:id
router.get('/post/:id', feedController.getPost);

// POST /feed/posts
router.post(
  '/post',
  [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 }),
  ],
  feedController.createPost,
);

// DELETE /feed/post/:id
router.delete('/post/:id', feedController.deletePost);

module.exports = router;
