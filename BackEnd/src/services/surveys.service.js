// src/services/surveys.service.js

const path = require('path');
const { readFile, writeFile } = require('fs/promises');
const Survey = require('../models/survey.model');

// 데이터 파일 경로 설정
const DATA_PATH = path.join(__dirname, '..', 'data', 'surveys.json');

// 서버 메모리에 데이터를 캐싱하여 사용
let surveyCache = [];

// 서버 시작 시 JSON 파일에서 데이터를 읽어 캐시에 저장하는 함수
async function loadSurveys() {
  try {
    const rawData = await readFile(DATA_PATH, 'utf8');
    const parsedData = JSON.parse(rawData);
    surveyCache = parsedData.map((item) => new Survey(item));
    console.log('Survey data loaded successfully.');
  } catch (error) {
    console.error("Could not load surveys. Starting with an empty list.", error);
    surveyCache = [];
  }
}
// 서버 시작 시 한번만 실행
loadSurveys();

// 새로운 설문이 제출되면 JSON 파일에도 저장하는 함수
async function persistSurveys() {
  try {
    await writeFile(DATA_PATH, JSON.stringify(surveyCache, null, 2), 'utf8');
  } catch (error) {
    console.error("Failed to save survey data:", error);
  }
}

// 다음 설문 ID를 계산하는 함수
function nextSurveyId() {
  return surveyCache.reduce((maxId, survey) => Math.max(survey.id, maxId), 0) + 1;
}

// 모든 설문 결과 조회
async function getAllSubmissions() {
  return [...surveyCache];
}

// 새 설문 제출
async function createSubmission(payload) {
  const requiredFields = ['date', 'name', 'age'];
  const missingField = requiredFields.find((field) => !payload[field]);
  if (missingField) {
    const error = new Error(`'${missingField}' is a required field.`);
    error.statusCode = 400;
    throw error;
  }

  const newSurvey = new Survey({ id: nextSurveyId(), ...payload });
  surveyCache.push(newSurvey);
  await persistSurveys(); // 파일에 변경사항 저장
  return newSurvey;
}

// [핵심 기능] 시각화 통계 데이터 생성
async function getVisualizationStats() {
  if (surveyCache.length === 0) {
    return { totalSubmissions: 0, message: "No data available." };
  }

  // 예: 나이대별 분포 계산
  const ageDistribution = surveyCache.reduce((acc, submission) => {
    const age = submission.age;
    if (age <= 19) acc['10대'] = (acc['10대'] || 0) + 1;
    else if (age <= 29) acc['20대'] = (acc['20대'] || 0) + 1;
    else if (age <= 39) acc['30대'] = (acc['30대'] || 0) + 1;
    else acc['40대 이상'] = (acc['40대 이상'] || 0) + 1;
    return acc;
  }, {});
  
  return {
    totalSubmissions: surveyCache.length,
    ageDistribution: Object.entries(ageDistribution).map(([range, count]) => ({ range, count })),
    // ... 여기에 더 많은 분석 로직을 추가할 수 있습니다.
  };
}

module.exports = {
  getAllSubmissions,
  createSubmission,
  getVisualizationStats,
};