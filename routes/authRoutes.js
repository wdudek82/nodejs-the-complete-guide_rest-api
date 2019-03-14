const express = require('express');

const validators = require('../utils/validators');
const authController = require('../controllers/authController');

const router = express.Router();

// PUT /auth/signup
router.put('/signup', validators.validateUser(), authController.signup);

module.exports = router;
