const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const mySocket = require('./socket');

const app = express();

/**
 * Multer settings
 */
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const imgMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  if (imgMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

/**
 * Middlewares
 */
app.use(express.json());
app.use(
  multer({
    storage: fileStorage,
    fileFilter,
  }).single('image'),
);
app.use('/images', express.static(path.resolve('images')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use((error, req, res, next) => {
  const { statusCode = 500, message, data } = error;
  res.status(statusCode).json({ message, data });
});

/**
 * Routes
 */
const feedRoutes = require('./routes/feedRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);

const hostname = 'localhost';
const port = 8080;

mongoose
  .connect('mongodb://localhost:27017/nodejs-the-complete-guide_rest-api')
  .then(() => {
    const server = app.listen(port, hostname);
    const io = mySocket.init(server);

    io.on('connection', (socket) => {
      console.log('Client connected');
    });
  })
  .catch(console.log);
