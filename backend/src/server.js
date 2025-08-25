require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Retorna todos os registros da tabela pet
app.get('/pets', async (req, res) => {
  try {
    const pets = await db('pet')
      .select('*')
      .orderBy('codpet', 'asc');
    res.json(pets);
  } catch (err) {
    console.error('Erro ao consultar pets:', err);
    res.status(500).json({ error: 'Erro ao consultar pets' });
  }
});

// Busca pet por código
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

// Endpoint simples de saúde do servidor
app.get('/health', (req, res) => res.json({ ok: true }));

// Inicializa o servidor
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
