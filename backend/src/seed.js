const db = require('./db');

async function seed() {
  try {
    // Apaga todos os registros antes de inserir
    await db('pet').del();

    // Insere os pets
    await db('pet').insert([
      { nome: 'Rex', especie: 'cao', raca: 'dalmata', peso: 20.5, datanasc: '2020-05-10' },
      { nome: 'Mia', especie: 'gato', raca: 'persa', peso: 4.2, datanasc: '2021-09-15' },
      { nome: 'Thor', especie: 'cao', raca: 'pastor alemao', peso: 30.5, datanasc: '2019-03-22' },
      { nome: 'Luna', especie: 'gato', raca: 'siames', peso: 3.8, datanasc: '2022-01-15' },
      { nome: 'Max', especie: 'cao', raca: 'labrador', peso: 28.0, datanasc: '2020-08-10' },
      { nome: 'Bella', especie: 'gato', raca: 'maine coon', peso: 5.5, datanasc: '2021-06-05' },
      { nome: 'Charlie', especie: 'cao', raca: 'beagle', peso: 12.3, datanasc: '2018-11-30' },
      { nome: 'Molly', especie: 'gato', raca: 'british shorthair', peso: 4.1, datanasc: '2020-12-12' },
      { nome: 'Rocky', especie: 'cao', raca: 'bulldog', peso: 24.0, datanasc: '2019-09-09' },
      { nome: 'Simba', especie: 'gato', raca: 'persa', peso: 4.5, datanasc: '2021-03-20' }
    ]);

    console.log('Tabela pet populada com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao popular tabela pet:', err);
    process.exit(1);
  }
}

seed();
