'use strict'

const router = require('express').Router()
const Team = require('../db/models/Team')

router.get('/:id', async (req, res, next) => {
  try {
    let singleTeam = await Team.findOne({
      where: {id: req.params.id}})
    res.send(singleTeam)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let allTeams = await Team.findAll()
    res.send(allTeams)
  } catch (error) {
    next(error)
  }
})

module.exports = router
