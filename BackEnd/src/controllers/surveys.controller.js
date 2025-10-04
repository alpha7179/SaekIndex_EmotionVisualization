/* src/controllers/surveys.controller.js */
const service = require('../services/surveys.service');
const asyncHandler = require('../utils/asyncHandler');

exports.getSurveys = asyncHandler(async (req, res) => {
  const items = await service.getAllSurveys();
  res.json({ data: items });
});

exports.getStats = asyncHandler(async (req, res) => {
  const stats = await service.getSurveyStats();
  res.json({ data: stats });
});