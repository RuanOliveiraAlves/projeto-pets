-- Crie o banco (rode no psql conectado ao servidor)
-- Se já existir, você pode pular o CREATE DATABASE.
CREATE DATABASE petsdb;
\c petsdb

-- Cria a tabela 'pet'
CREATE TABLE IF NOT EXISTS pet (
  codpet SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especie VARCHAR(50) NOT NULL,
  raca VARCHAR(50),
  peso DECIMAL(5,2),
  datanasc DATE
);

-- Dados de exemplo
INSERT INTO pet (nome, especie, raca, peso, datanasc) VALUES
('Rex', 'Cão', 'Labrador', 30.5, '2020-01-01'),
('Mimi', 'Gato', 'Siamês', 5.2, '2021-03-15'),
('Bob', 'Cão', 'Vira-lata', 12.0, '2019-07-20')
ON CONFLICT DO NOTHING;
