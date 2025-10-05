// src/services/surveys.service.js
const Survey = require('../models/survey.model');

async function getAllSurveys(page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;

    const totalSurveys = await Survey.countDocuments();

    const surveys = await Survey.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      surveys,
      totalSurveys,
      totalPages: Math.ceil(totalSurveys / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('[SERVICE ERROR] in getAllSurveys:', error);
    throw error;
  }
}

async function createSurvey(payload) {
  const survey = new Survey(payload);
  await survey.save();
  return survey;
}

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
  };
}

async function updateSurvey(id, payload) {
  const updateData = Object.fromEntries(
    Object.entries(payload).filter(([_, v]) => v !== null && v !== undefined && v !== '')
  );
  return await Survey.findByIdAndUpdate(
    id, { $set: updateData }, { new: true, runValidators: true, lean: true }
  );
}

async function deleteSurvey(id) {
   console.log(`[DELETE SERVICE] ID: ${id}로 DB에서 문서를 찾아서 삭제를 시도합니다.`);
  try {
    const result = await Survey.findByIdAndDelete(id).lean();
    
    if (result) {
      console.log('[DELETE SERVICE] Mongoose가 성공적으로 문서를 찾아 삭제했습니다.');
    } else {
      // 이 로그가 뜬다면, 전달된 ID가 DB에 존재하지 않는다는 의미입니다.
      console.log('[DELETE SERVICE] Mongoose가 해당 ID의 문서를 찾지 못했습니다. null을 반환합니다.');
    }
    return result;
  } catch (error) {
    console.error('[DELETE SERVICE] findByIdAndDelete 함수 실행 중 심각한 오류 발생:', error);
    // 에러가 발생하면 컨트롤러로 전파하여 500 에러를 유발합니다.
    throw error;
  }
}

module.exports = {
  createSurvey,
  getAllSurveys,
  getSurveyStats,
  updateSurvey,
  deleteSurvey,
};