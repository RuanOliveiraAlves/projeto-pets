/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return knex.schema.createTable('pet', table => {
    table.increments('codpet').primary();       // código do pet
    table.string('nome', 100).notNullable();    // nome
    table.string('especie', 50).notNullable(); // espécie
    table.string('raca', 50);                   // raça
    table.decimal('peso', 5, 2);                // peso
    table.date('datanasc');                     // data de nascimento
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return knex.schema.dropTableIfExists('pet');
};
