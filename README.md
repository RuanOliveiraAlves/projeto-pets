# Projeto: Sistema Pets (PostgreSQL + Node/Express/Knex + Frontend JS)

## Estrutura
```
projeto-pets/
  backend/
    .env
    package.json
    src/
      db.js
      server.js
  frontend/
    index.html
    style.css
    script.js
  sql/
    setup.sql
```

## Passo 0 — Banco de Dados (psql)
1. Abra o **SQL Shell (psql)** e conecte como `postgres` (Enter em Server/Database/Port, digite `postgres` como usuário e sua senha).
2. Rode o script SQL:
   ```
   \i caminho/para/sql/setup.sql
   ```
   Ou copie e cole o conteúdo do arquivo `sql/setup.sql`.

## Passo 1 — Backend
1. Abra o VS Code na pasta `projeto-pets`.
2. Abra um terminal na pasta `backend/`.
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Edite o arquivo `.env`** e coloque **a sua senha do PostgreSQL** em `PGPASSWORD`. Confirme se `PGDATABASE=petsdb`.
5. **Suba o servidor:**
   ```bash
   npm run dev
   ```
   O backend ficará em `http://localhost:3000`.
   Teste em `http://localhost:3000/pets`.

## Passo 2 — Frontend
1. Abra o arquivo `frontend/index.html` no navegador (pode ser com Live Server do VS Code ou abrindo o arquivo direto).
2. Clique em **Consultar Pets** para carregar os dados.
3. Use o campo de **filtro** para filtrar por nome/espécie/raça/etc.

## Anotações
- O CORS já está liberado no backend.
- As datas são exibidas no formato local `pt-BR` no frontend.
- Se precisar mudar a porta do backend, altere `PORT` no `.env` e troque a URL em `script.js`.
