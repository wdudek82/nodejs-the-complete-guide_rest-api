const express = require('express');

const validators = require('../utils/validators');
const authController = require('../controllers/authController');

const router = express.Router();

// PUT /auth/signup
router.put('/signup', validators.validateUser(), authController.signup);

// POST /auth/login
router.post('/login', authController.login);

module.exports = router;
