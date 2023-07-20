/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('user', table => {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.string('username');
      table.string('password');
    })
    .createTable('item', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('user.id');
      table.string('item_name');
      table.string('description');
      table.integer('quantity');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('item')
  .dropTableIfExists('user')
};