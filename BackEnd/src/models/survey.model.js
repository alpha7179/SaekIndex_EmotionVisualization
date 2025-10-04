// src/models/survey.model.js
class Survey {
  constructor({ id, date, name, age, question1, question2, question3, question4 }) {
    this.id = Number(id);
    this.date = date;
    this.name = name;
    this.age = Number(age);
    this.question1 = question1; // 예: ["3", "4"]
    this.question2 = question2; // 예: "5"
    this.question3 = question3; // 예: "2"
    this.question4 = question4; // 예: "자유로운 의견..."
  }
}

module.exports = Survey;