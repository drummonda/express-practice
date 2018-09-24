'use strict';

const db = require('./_db');

const Owner = require('./Owner');
const Pet = require('./Pet');

Owner.hasMany(Pet);
Pet.belongsTo(Owner);

module.exports = db;
