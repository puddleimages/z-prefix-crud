/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {id: 1, user_id: 1, item_name: 'Foo', description: 'Bar', quantity: 1},
    {id: 2, user_id: 2, item_name: 'Test item', description: 'Description of the test item', quantity: 1},
    {id: 3, user_id: 2, item_name: 'Sample item', description: 'Description of the sample item', quantity: 9000}
  ]);
};
