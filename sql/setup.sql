-- Criando banco e conectando
CREATE DATABASE petsdb;
\c petsdb

-- Criando tabela 'pet'
CREATE TABLE IF NOT EXISTS pet (
  codpet SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  especie VARCHAR(50) NOT NULL,
  raca VARCHAR(50),
  peso DECIMAL(5,2),
  datanasc DATE
);

-- Inserindo dados de exemplo
INSERT INTO pet (nome, especie, raca, peso, datanasc) VALUES
('Rex', 'Cão', 'Dálmata', 20.50, '2020-05-10'),
('Mia', 'Gato', 'Persa', 4.20, '2021-09-15'),
('Thor', 'Cão', 'Pastor Alemão', 30.50, '2019-03-22'),
('Luna', 'Gato', 'Siamês', 3.80, '2022-01-15'),
('Max', 'Cão', 'Labrador', 28.00, '2020-08-10'),
('Bella', 'Gato', 'Maine Coon', 5.50, '2021-06-05'),
('Charlie', 'Cão', 'Beagle', 12.30, '2018-11-30'),
('Molly', 'Gato', 'British Shorthair', 4.10, '2020-12-12'),
('Rocky', 'Cão', 'Bulldog', 24.00, '2019-09-09'),
('Simba', 'Gato', 'Persa', 4.50, '2021-03-20'),
('Lia', 'Cão', 'Poodle', 2.80, '2023-11-08'),
('Lão', 'Gato', 'Siamês', 4.20, '2022-02-20')
ON CONFLICT DO NOTHING;
