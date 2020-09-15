exports.up = function (knex) {
  return knex.schema.createTable('errors', errors => {
    errors.increments();
    errors.string('error_code');
    errors.text('error_details');
    errors.dateTime('error_time').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('errors');
};
