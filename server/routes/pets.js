'use strict';

const express = require('express');
const db = require('../models');
const Owner = db.models.owner;
const Pet = db.models.pet;

// This router is already mounted on /students in server/app.js
const router = express.Router();

/*
  #1 GET /api/pets fetches all pets
*/

/*
  #2 GET /api/pets/:id fetches a single pet
*/

/*
  #3 POST /api/pets posts a new pet
*/

/*
  #4 PUT /api/pets/:id updates pet
*/

/*
  #5 DELETE /api/pets/:id deletes pet
*/

module.exports = router;
