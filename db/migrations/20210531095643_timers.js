
exports.up = function(knex) {
  return knex.schema.createTable('timers', timers => {
    timers.increments();
    timers.text('timer_text').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('timers')
};
