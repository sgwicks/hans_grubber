const { commands } = require('../data/index.js');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      // Inserts seed entries
      return knex('commands').insert(commands);
    })
    .catch(err => console.log(err));
};
