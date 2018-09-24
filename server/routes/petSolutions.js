'use strict';

const express = require('express');
const db = require('../models');
const Owner = db.models.owner;
const Pet = db.models.pet;

// This router is already mounted on /students in server/app.js
const router = express.Router();

// /api/pets fetches all pets
router.get('/', async (req, res, next) => {
  try {
    const allPets = await Pet.findAll();
    res.send(allPets);
  } catch (err) {
    next(err);
  }
});

// /api/pets/:id fetches a single pet
router.get('/:id', async (req, res, next) => {
  try {
    const petIdToFetch = req.params.id;
    const pet = await Pet.findById(petIdToFetch);
    res.send(pet);
  } catch (err) {
    next(err);
  }
});

// /api/pets posts a new pet
router.post('/', async (req, res, next) => {
  try {
    const { name, age, favorite_food } = req.body;
    const createdPet = await Pet.create({
      name,
      age,
      favorite_food
    });
    res.status(201).send(createdPet);
  } catch (err) {
    next(err);
  }
});

// /api/pets/:id updates pet
router.put('/:id', async (req, res, next) => {
  try {
    const petIdToUpdate = req.params.id;
    const pet = await Pet.findById(petIdToUpdate);
    const updatedPet = await pet.update(req.body);
    res.status(201).send(updatedPet);
  } catch (err) {
    next(err);
  }
});

// /api/pets/:id deletes pet
router.delete('/:id', async (req, res, next) => {
  try {
    const petIdToDelete = req.params.id;
    const pet = await Pet.findById(petIdToDelete);
    await pet.destroy();
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
