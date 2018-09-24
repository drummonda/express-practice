'use strict';

const express = require('express');
const db = require('../models');
const Owner = db.models.owner;
const Pet = db.models.pet;

// This router is already mounted on /campuses in server/app.js
const router = express.Router();

// /api/owners fetches all campuses
router.get('/', async (req, res, next) => {
  try {
    const allOwners = await Owner.findAll();
    res.send(allOwners);
  } catch (err) {
    next(err);
  }
});

// /api/owners/:id fetches one campus
router.get('/:id', async (req, res, next) => {
  try {
    const ownerId = req.params.id;
    const foundOwner = await Owner.findById(ownerId, {
      include: [Pet],
    });
    res.send(foundOwner);
  } catch (err) {
    next(err);
  }
});

// /api/campuses/:id/students fetches all students for one campus
router.get('/:id/pets', async (req, res, next) => {
  try {
    const ownerId = req.params.id;
    const ownerPets = await Pet.findAll({
      where: {
        ownerId,
      }
    });
    res.send(ownerPets);
  } catch (err) {
    next(err);
  }
});

// /api/owners creates an owner
router.post('/', async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const owner = await Owner.create({
      name,
      age
    });
    res.status(201).send(owner);
  } catch (err) {
    next(err);
  }
});

// /api/owners/:id updates an owner
router.put('/:id', async (req, res, next) => {
  try {
    const ownerId = req.params.id;
    const owner = await Owner.findById(ownerId);
    const updatedOwner = await owner.update(req.body);
    res.status(201).send(updatedOwner);
  } catch (err) {
    next(err);
  }
});

// /api/owners/:id/pets creates a pet
router.post('/:id/pets', async (req, res, next) => {
  try {
    const { name, age, favorite_food } = req.body;
    const { id } = req.params;
    const createdPet = await Pet.create({
      name,
      age,
      favorite_food,
      campusId: id
    });
    res.status(201).send(createdPet);
  } catch (err) {
    next(err);
  }
});


// /api/owners/:id deletes an owner
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const ownerToDestroy = await Owner.findById(id);
    await ownerToDestroy.destroy();
    res.sendStatus(201);
  } catch (err) {
    next (err);
  }
})

module.exports = router;
