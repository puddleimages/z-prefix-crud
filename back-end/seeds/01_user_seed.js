/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {id: 1, first_name: 'Foo', last_name: 'Bar', username: 'Foobar', password: 'password'},
    {id: 2, first_name: 'Inventory', last_name: 'Manager', username: 'Manager', password: 'password'}
  ]);
};
