#!/usr/bin/env node

const db = require('../server/models')
const Owner = require('../server/models/Owner')
const Pet = require('../server/models/Pet')
const data = require('../data/owners.json')

const seed = async () => {
  await db.sync({force: true})

  await Promise.all(data.map(async ownerData => {
    const owner = await Owner.create(ownerData);
    await Promise.all(ownerData.pets.map(async petData => {
      const pet = await Pet.create(petData);
      await pet.setOwner(owner);
    }));
  }));

  db.close()
  console.log(`

    Seeding successful!
    Time to do stuff!

  `)
}

seed().catch(err => {
  db.close()
  console.log(`

    Error seeding:

    ${err.message}

    ${err.stack}

  `)
})
