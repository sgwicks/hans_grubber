const commands_data = require('../data/commands');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('commands')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('commands').insert(commands_data);
    });
};
