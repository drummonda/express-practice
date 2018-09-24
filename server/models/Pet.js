const Sequelize = require('sequelize');
const db = require('./_db');

const Pet = db.define('pet', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  favorite_food: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Pet;
