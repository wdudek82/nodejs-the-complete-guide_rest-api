const express = require('express');

const validators = require('../utils/validators');
const feedController = require('../controllers/feedController');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// GET /feed/post/:id
router.get('/post/:id', feedController.getPost);

// POST /feed/posts
router.post('/post', validators.validatePost(), feedController.createPost);

// PUT /feed/post/:id
router.put('/post/:id', validators.validatePost(), feedController.updatePost);

// DELETE /feed/post/:id
router.delete('/post/:id', feedController.deletePost);

module.exports = router;
