const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database(':memory:');

// Criar a tabela de exemplo
db.serialize(() => {
  db.run('CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
});

// Criar um novo item (Create)
app.post('/items', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO items (name) VALUES (?)', [name], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name });
  });
});

// Listar todos os itens (Read)
app.get('/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Buscar um item pelo ID (Read)
app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    res.json(row);
  });
});

// Atualizar um item pelo ID (Update)
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.run('UPDATE items SET name = ? WHERE id = ?', [name, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    res.json({ id, name });
  });
});

// Excluir um item pelo ID (Delete)
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    res.json({ message: 'Item excluído com sucesso' });
  });
});

// Rota inicial
app.get('/', (req, res) => {
  res.send('CRUD com Node.js e SQLite');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`);
});
