// src/app.js
const express = require('express');
const cors = require('cors');
const surveysRouter = require('./routes/surveys.routes');
const notFound = require('./middleware/notFound.middleware');
const errorHandler = require('./middleware/error.middleware');

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/surveys', surveysRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;