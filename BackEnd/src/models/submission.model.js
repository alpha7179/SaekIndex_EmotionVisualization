// src/models/submission.model.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubmissionSchema = new Schema({
 
  date: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  question1: [String],
  question2: String,
  question3: String,
  question4: String,
  
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending', index: true }
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);