const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');

const { errorHandler } = require('../utils/error-handler');

const { User } = require('../models/userModel');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    throw error;
  }

  const { email, name, password } = req.body;

  const saltRounds = 12;
  bcrypt
    .hash(password, saltRounds)
    .then((hashedPasswd) => {
      const user = new User({
        name,
        email,
        password: hashedPasswd,
      });

      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch((err) => errorHandler(err, next));
};

// exports.
