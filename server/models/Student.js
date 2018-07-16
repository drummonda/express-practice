'use strict';

const Sequelize = require('sequelize');
const db = require('./_db');

const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phase: {
    type: Sequelize.ENUM('junior', 'senior'),
    allowNull: false,
  }
});

// Student.findByPhase class method
Student.findByPhase = async function (phase) {
  const studentsByPhase = await Student.findAll({
    where: {
      phase: phase,
    }
  })
  return studentsByPhase;
}

module.exports = Student;
