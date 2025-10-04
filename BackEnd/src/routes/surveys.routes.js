// src/routes/surveys.routes.js
const express = require('express');
const controller = require('../controllers/surveys.controller');

const router = express.Router();

router.get('/', controller.getSurveys);
router.get('/stats', controller.getStats);

module.exports = router;