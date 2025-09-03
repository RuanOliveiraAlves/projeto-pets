exports.seed = async function(knex) {
  await knex('pet').del(); // limpa tabela antes de inserir
  await knex('pet').insert([
    { nome: 'Rex', especie: 'Cão', raca: 'Labrador', peso: 30.5, datanasc: '2020-01-01' },
    { nome: 'Mimi', especie: 'Gato', raca: 'Siamês', peso: 5.2, datanasc: '2021-03-15' },
    { nome: 'Bob', especie: 'Cão', raca: 'Vira-lata', peso: 12.0, datanasc: '2019-07-20' }
  ]);
};
