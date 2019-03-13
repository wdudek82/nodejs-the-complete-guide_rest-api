const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/**
 * Middlewares
 */
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATH, DELETE');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
  next();
});

/**
 * Routes
 */
const feedRoutes = require('./routes/feedRoutes');

app.use('/feed', feedRoutes);

app.listen(8080);
