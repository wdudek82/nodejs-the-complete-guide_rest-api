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

app.listen(port, hostname,() => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
