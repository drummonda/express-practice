'use strict';

const express = require('express');
const db = require('../models');
const Campus = db.models.campus;
const Student = db.models.student;

// This router is already mounted on /campuses in server/app.js
const router = express.Router();

// /api/campuses fetches all campuses
router.get('/', async (req, res, next) => {
  try {
    const allCampuses = await Campus.findAll();
    res.send(allCampuses);
  } catch (err) {
    next(err);
  }
});

// /api/campuses/:id fetches one campus
router.get('/:id', async (req, res, next) => {
  try {
    const campusId = req.params.id;
    const foundCampus = await Campus.findById(campusId);
    res.send(foundCampus);
  } catch (err) {
    next(err);
  }
});

// /api/campuses/:id/students fetches all students for one campus
router.get('/:id/students', async (req, res, next) => {
  try {
    const campusId = req.params.id;
    const campusStudents = await Student.findAll({
      where: {
        campusId: campusId,
      }
    });
    res.send(campusStudents);
  } catch (err) {
    next(err);
  }
})

module.exports = router;
