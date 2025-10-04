// src/routes/surveys.routes.js

const express = require('express');
const surveysController = require('../controllers/surveys.controller');

const router = express.Router();

// [GET] /api/surveys - 모든 설문 결과 조회
router.get('/', surveysController.getSubmissions);

// [POST] /api/surveys - 새 설문 제출
router.post('/', surveysController.submitSurvey);

// [GET] /api/surveys/stats - 시각화를 위한 통계 데이터 조회
router.get('/stats', surveysController.getStats);

module.exports = router;