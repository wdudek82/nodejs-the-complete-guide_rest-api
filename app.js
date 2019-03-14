const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use('/images', express.static(path.resolve('images')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/**
 * Routes
 */
const feedRoutes = require('./routes/feedRoutes');

app.use('/feed', feedRoutes);

const hostname = 'localhost';
const port = 8080;

/**
 * Error handler
 */
app.use((error, req, res, next) => {
  console.log(error);
  const { statusCode = 500, message } = error;
  res.status(statusCode).json(message);
});

mongoose
  .connect('mongodb://localhost:27017/nodejs-the-complete-guide_rest-api')
  .then(() => {
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  })
  .catch(console.log);
