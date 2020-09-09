const { connection } = require('../knexfile');

exports.up = function (knex) {
  return knex.schema.createTable('commands', commands => {
    commands.increments();
    commands.string('command_name').unique().notNullable();
    commands.text('command_text').notNullable();
    commands.integer('command_uses');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('commands');
};
