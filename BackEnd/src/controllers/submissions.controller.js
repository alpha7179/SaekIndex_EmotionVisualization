// src/controllers/submissions.controller.js
const service = require('../services/submissions.service');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (req, res) => {
  const items = await service.listSubmissions(req.query.status);
  res.json({ data: items });
});
exports.create = asyncHandler(async (req, res) => {
  const created = await service.createSubmission(req.body);
  res.status(201).json({ data: created });
});
exports.approve = asyncHandler(async (req, res) => {
  const approved = await service.approveSubmission(req.params.id);
  if (!approved) return res.status(404).json({ error: { message: 'Submission not found' } });
  res.json({ data: approved });
});
exports.reject = asyncHandler(async (req, res) => {
  const rejected = await service.rejectSubmission(req.params.id);
  if (!rejected) return res.status(404).json({ error: { message: 'Submission not found' } });
  res.json({ data: rejected });
});
exports.remove = asyncHandler(async (req, res) => {
  const deleted = await service.deleteSubmission(req.params.id);
  if (!deleted) return res.status(404).json({ error: { message: 'Submission not found' } });
  res.status(204).send();
});