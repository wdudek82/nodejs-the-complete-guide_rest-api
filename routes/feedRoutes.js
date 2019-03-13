const express = require('express');

const feedController = require('../controllers/feedController');

const router = express.Router();

// GET :: /feed/posts
router.get('/posts', feedController.getPosts);

// POST :: /feed/posts
router.post('/post', feedController.createPost);

module.exports = router;
