// src/services/submissions.service.js
const Submission = require('../models/submission.model');
const surveysService = require('./surveys.service');

// (사용자가) 새 설문 제출 (관리 DB에 pending 상태로 저장)
async function createSubmission(payload) {
  const submission = new Submission(payload);
  await submission.save();
  return submission;
}

// 상태별 설문 목록 조회
async function listSubmissions(status) {
  const filter = status ? { status } : {};
  return await Submission.find(filter).sort({ createdAt: -1 }).lean();
}

// [핵심 워크플로우] 설문 승인
async function approveSubmission(id) {
  const submission = await Submission.findById(id);
  if (!submission || submission.status !== 'pending') {
    const error = new Error('Submission not found or already processed.');
    error.statusCode = 404;
    throw error;
  }

  // 1. Submission 데이터로 최종 Survey 데이터 생성
  await surveysService.createSurvey({
    submissionId: submission._id,
    date: submission.date,
    name: submission.name,
    age: submission.age,
    question1: submission.question1,
    question2: submission.question2,
    question3: submission.question3,
    question4: submission.question4,
  });

  // 2. Submission 상태를 'approved'로 변경
  submission.status = 'approved';
  await submission.save();
  return submission;
}

// 설문 거절
async function rejectSubmission(id) {
  return await Submission.findByIdAndUpdate(
    id,
    { $set: { status: 'rejected' } },
    { new: true, lean: true }
  );
}

// 설문 삭제
async function deleteSubmission(id) {
  return await Submission.findByIdAndDelete(id).lean();
}


module.exports = {
  createSubmission,
  listSubmissions,
  approveSubmission,
  rejectSubmission,
  deleteSubmission
};