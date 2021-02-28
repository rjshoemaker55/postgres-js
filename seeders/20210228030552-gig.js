'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Gigs', [
      {
        title: 'React Developer',
        technologies: 'React, Javascript, HTML, CSS',
        budget: '$500',
        description: 'In need of a React developer for a porject.',
        contact_email: 'test@test.test',
        createdAt: Date.now()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Gigs', null, {})
  }
}
