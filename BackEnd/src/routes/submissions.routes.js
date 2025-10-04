// src/routes/submissions.routes.js
const express = require('express');
const controller = require('../controllers/submissions.controller');

const router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);
router.put('/:id/approve', controller.approve); // 승인 경로
router.put('/:id/reject', controller.reject);   // 거절 경로
router.delete('/:id', controller.remove);

module.exports = router;