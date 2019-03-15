const express = require('express');

const validators = require('../utils/validators');
const feedController = require('../controllers/feedController');
const isAuth = require('../middleware/authMiddleware');

const router = express.Router();

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);

// GET /feed/post/:id
router.get('/post/:id', isAuth, feedController.getPost);

// POST /feed/posts
router.post(
  '/post',
  isAuth,
  validators.validatePost(),
  feedController.createPost,
);

// PUT /feed/post/:id
router.put(
  '/post/:id',
  isAuth,
  validators.validatePost(),
  feedController.updatePost,
);

// DELETE /feed/post/:id
router.delete('/post/:id', isAuth, feedController.deletePost);

module.exports = router;
