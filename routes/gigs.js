const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const db = require('../config/database')
const { Gig } = require('../models')

// Get gig list
router.get('/', (req, res) => {
  Gig.findAll({ raw: true })
    .then((gigs) =>
      res.render('gigs', {
        gigs
      })
    )
    .catch((err) => console.log('Error', err))
})

// Display add gig form
router.get('/add', (req, res) => res.render('add'))

// Add gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body
  let errors = []

  if (!title) {
    errors.push({ text: 'Please add a title.' })
  }
  if (!technologies) {
    errors.push({ text: 'Please add some technologies.' })
  }
  if (!description) {
    errors.push({ text: 'Please add a description.' })
  }
  if (!contact_email) {
    errors.push({ text: 'Please add a contact email.' })
  }

  // Check for errrors
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    })
  } else {
    if (!budget) {
      budget = 'Unknown'
    } else {
      budget = `$${budget}`
    }

    // Make list lowercase and remove space after commas
    technologies = technologies.toLowerCase().replace(/, /g, ',')

    // Insert into table
    Gig.create({
      title,
      technologies,
      budget,
      description,
      contact_email
    })
      .then((gig) => res.redirect('/gigs'))
      .catch((err) => console.log('Error', err))
  }
})

// Search route
router.get('/search', (req, res) => {
  let { term } = req.query
  term = term.toLowerCase()

  Gig.findAll({
    where: { technologies: { [Op.like]: '%' + term + '%' } },
    raw: true
  })
    .then((gigs) => res.render('gigs', { gigs }))
    .catch((err) => console.log(`Error: ${err}`))
})

module.exports = router
