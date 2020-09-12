const { commands } = require('../data/index.js');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('commands')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('commands').insert(commands);
    });
};
