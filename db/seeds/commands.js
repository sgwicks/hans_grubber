const { commands, quotes, timers } = require('../data/index.js');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.migrate.rollback(null, true)
    .then(() => knex.migrate.latest())
    .then(() => {
      // Inserts seed entries
      return knex('commands').insert(commands)
        .then(() => {
          return knex('quotes').insert(quotes)
        })
        .then(() => {
          return knex('timers').insert(timers)
        })

    })
    .catch(err => console.log(err));
};
