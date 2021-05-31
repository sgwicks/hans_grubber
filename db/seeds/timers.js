const { timers } = require('../data/index.js')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('timers').del()
    .then(() => {
      // Inserts seed entries
      return knex('timers').insert(timers);
    });
};
