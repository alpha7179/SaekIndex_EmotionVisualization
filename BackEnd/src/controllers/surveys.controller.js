// src/controllers/surveys.controller.js

const surveyService = require('../services/surveys.service');
const asyncHandler = require('../utils/asyncHandler');

// 새 설문 제출
exports.submitSurvey = asyncHandler(async (req, res) => {
  const newSurveyData = req.body;
  const createdSurvey = await surveyService.createSubmission(newSurveyData);
  res.status(201).json({ data: createdSurvey });
});

// 모든 설문 결과 조회
exports.getSubmissions = asyncHandler(async (req, res) => {
  const allSubmissions = await surveyService.getAllSubmissions();
  res.status(200).json({ data: allSubmissions });
});

// 시각화 통계 데이터 조회
exports.getStats = asyncHandler(async (req, res) => {
  const stats = await surveyService.getVisualizationStats();
  res.status(200).json({ data: stats });
});