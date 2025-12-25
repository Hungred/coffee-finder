// server/index.js
import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
app.use(cors());

app.get('/ping', (req, res) => {
  res.json({ ok: true });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});

// // 取得全部咖啡廳
// app.get('/api/cafes', (req, res) => {
//   const cafes = db.prepare('SELECT * FROM cafes').all();
//   res.json(cafes);
// });

// 取得特定咖啡廳
app.get('/api/cafes/:id', (req, res) => {
  const cafe = db
    .prepare('SELECT * FROM cafes WHERE id = ?')
    .get(req.params.id);
  if (!cafe) return res.status(404).json({ message: 'Cafe not found' });

  res.json(cafe);
});

// // 查詢咖啡廳
// app.get('/api/cafes', (req, res) => {
//   const cafe = db
//     .prepare('SELECT * FROM cafes WHERE id = ?')
//     .get(req.params.id);
//   if (!cafe) return res.status(404).json({ message: 'Cafe not found' });

//   res.json(cafe);
// });

app.get('/api/cafes', (req, res) => {
  const { searchQuery, name, city, tags } = req.query;
  console.log('tag', tags, req.body);
  let sql = 'SELECT * FROM cafes WHERE 1=1';
  const params = [];

  if (searchQuery || name) {
    sql += ' AND name LIKE ?';
    params.push(`%${searchQuery || name}%`);
  }

  if (searchQuery || city) {
    sql += ' AND city LIKE ?';
    params.push(`%${searchQuery || city}%`);
  }

  if (tags) {
    const selectedTags = Array.isArray(tags) ? tags : [tags];

    if (!selectedTags.includes('all')) {
      selectedTags.forEach((tag) => {
        if (tag === 'wifi') sql += ' AND wifi >= 4';
        if (tag === 'quiet') sql += ' AND quiet >= 4';
        if (tag === 'seat') sql += ' AND seat >= 4';
        if (tag === 'limited_time') sql += " AND limited_time = 'no'";
      });
    }
  }
  console.log('Final SQL:', sql, params);
  const cafes = db.prepare(sql).all(...params);
  res.json(cafes);
});
