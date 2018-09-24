'use strict';

const express = require('express');
const db = require('../models');
const Owner = db.models.owner;
const Pet = db.models.pet;

// This router is already mounted on /campuses in server/app.js
const router = express.Router();

/*
  #1 GET /api/owners fetches all owners
*/

/*
  #2 GET /api/owners/:id fetches a single owner
*/

/*
  #3 POST /api/owners posts a new owner
*/

/*
  #4 PUT /api/owner/:id updates owner
*/

/*
  #5 DELETE /api/owners/:id deletes owner
*/

module.exports = router;
