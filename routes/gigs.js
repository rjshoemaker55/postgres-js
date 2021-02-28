const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Gig = require('../models/gig')

// Get gig list
router.get('/', (req, res) => {
  Gig.findAll()
    .then((gigs) => {
      console.log(gigs)
      res.sendStatus(200)
    })
    .catch((err) => console.log('Error', err))
})

// Add gig
router.get('/add', (req, res) => {
  const data = {
    title: 'Looking for a React developer.',
    technologies: 'React, Javascript, HTML, CSS',
    budget: '$3000',
    description:
      'Hello this is the description for the react developer position thank you for your interest balajajisodfjiajisj ijasidfjiajijd aijsfijaijsidjfia isjfiajsidfjiajidf iajdsf iajdsfiaj idsfjia jsdifjaisdjfiajidsfjiajis fiji ias dif aijsdf aijisd fiadifja,.',
    contactEmail: 'test@test.test'
  }

  let { title, technologies, budget, description, contactEmail } = data

  // Insert into table
  Gig.create({
    title,
    technologies,
    budget,
    description,
    contactEmail
  })
    .then((gig) => res.redirect('/gigs'))
    .catch((err) => console.log('Error', err))
})

module.exports = router
