// src/services/surveys.service.js
const Survey = require('../models/survey.model');

// (관리자가 승인 시) 새로운 최종 설문 데이터 생성
async function createSurvey(payload) {
  const survey = new Survey(payload);
  await survey.save();
  return survey;
}

// 모든 최종 설문 데이터 조회
async function getAllSurveys() {
  return await Survey.find({}).sort({ createdAt: -1 }).lean();
}

// [핵심 기능] 시각화를 위한 통계 데이터 생성
async function getSurveyStats() {
  const allSurveys = await Survey.find({});
  if (allSurveys.length === 0) {
    return { totalSurveys: 0, message: "No data available." };
  }
  const ageDistribution = allSurveys.reduce((acc, survey) => {
      const age = survey.age;
      if (age <= 19) acc['10대'] = (acc['10대'] || 0) + 1;
      else if (age <= 29) acc['20대'] = (acc['20대'] || 0) + 1;
      else if (age <= 39) acc['30대'] = (acc['30대'] || 0) + 1;
      else acc['40대 이상'] = (acc['40대 이상'] || 0) + 1;
      return acc;
  }, {});

  return {
      totalSurveys: allSurveys.length,
      ageDistribution: Object.entries(ageDistribution).map(([range, count]) => ({ range, count })),
      // ... 향후 더 많은 통계 분석 로직 추가
  };
}

module.exports = {
  createSurvey,
  getAllSurveys,
  getSurveyStats,
};