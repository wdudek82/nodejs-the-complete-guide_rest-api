const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;

  User.findOne(email)
    .then((user) => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }

      loadedUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        { email, userId: loadedUser._id.toString() },
        '!LjvDNIboMh@?M3Z1-/Uz70o:98piA',
        { expiresIn: '1h' },
      );

      res.status(200).json({ token, userId: loadedUser._id.toString() });
    })
    .catch((err) => errorHandler(err, next));
};
