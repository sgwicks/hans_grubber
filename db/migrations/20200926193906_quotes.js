
exports.up = function(knex) {
    return knex.schema.createTable('quotes', quotes => {
        quotes.increments();
        quotes.text('quote_text').notNullable();
        quotes.integer('quote_uses').defaultTo(0);
        quotes.string('quote_game')
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('quotes')
};
