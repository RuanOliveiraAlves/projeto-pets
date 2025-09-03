// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db'); // sua conexão Knex

const app = express();

// Permitir requisições de outras origens e ler JSON
app.use(cors());
app.use(express.json());

// Garantir que respostas usem UTF-8
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Função que cria a tabela 'pet' se não existir e insere pets iniciais
async function setupDB() {
  try {
    const exists = await db.schema.hasTable('pet');
    if (!exists) {
      console.log('Tabela pet não existe. Criando...');
      await db.schema.createTable('pet', table => {
        table.increments('codpet').primary();   // código do pet
        table.string('nome', 100).notNullable();    // nome
        table.string('especie', 50).notNullable(); // espécie
        table.string('raca', 50);                   // raça
        table.decimal('peso', 5, 2);                // peso
        table.date('datanasc');                     // data de nascimento
      });
      console.log('Tabela criada.');

      console.log('Inserindo pets iniciais...');
      await db('pet').insert([
        { nome: 'Rex', especie: 'Cão', raca: 'Labrador', peso: 30.5, datanasc: '2020-01-01' },
        { nome: 'Mimi', especie: 'Gato', raca: 'Siamês', peso: 5.2, datanasc: '2021-03-15' },
        { nome: 'Bob', especie: 'Cão', raca: 'Vira-lata', peso: 12.0, datanasc: '2019-07-20' }
      ]);
      console.log('Pets iniciais inseridos.');
    } else {
      console.log('Tabela pet já existe. Nada a fazer.');
    }
  } catch (err) {
    console.error('Erro ao configurar banco de dados:', err);
  }
}

// -------------------- Endpoints -------------------- //

// Listar todos os pets
app.get('/pets', async (req, res) => {
  try {
    const pets = await db('pet').select('*').orderBy('codpet', 'asc');
    res.json(pets);
  } catch (err) {
    console.error('Erro ao consultar pets:', err);
    res.status(500).json({ error: 'Erro ao consultar pets' });
  }
});

// Buscar pet por ID
app.get('/pets/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  try {
    const pet = await db('pet').where('codpet', id).first();
    if (!pet) return res.status(404).json({ error: 'Pet não encontrado' });
    res.json(pet);
  } catch (err) {
    console.error('Erro ao buscar pet:', err);
    res.status(500).json({ error: 'Erro ao buscar pet' });
  }
});

// Cadastrar novo pet
app.post('/pets', async (req, res) => {
  const { nome, especie, raca, peso, datanasc } = req.body;

  if (!nome || !especie) {
    return res.status(400).json({ error: 'Nome e espécie são obrigatórios' });
  }

  try {
    const [novoPet] = await db('pet')
      .insert({ nome, especie, raca, peso, datanasc })
      .returning('*');
    res.status(201).json(novoPet);
  } catch (err) {
    console.error('Erro ao cadastrar pet:', err);
    res.status(500).json({ error: 'Erro ao cadastrar pet' });
  }
});

// Endpoint simples de saúde do servidor
app.get('/health', (req, res) => res.json({ ok: true }));

// -------------------- Inicialização -------------------- //

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Primeiro configura o banco, depois inicia o servidor
setupDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
}).catch(err => {
  console.error('Erro ao inicializar servidor:', err);
});
