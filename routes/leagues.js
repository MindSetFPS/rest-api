// routes/league.js
const express = require('express');
const router = express.Router();
const db = require("../db");

router.get('/', (req, res) => {
  // Handle GET /league request
  db.query('SELECT * FROM league', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const query = "INSERT INTO league (name, begining_date, ending_date, prize_pool) VALUES (?, ?, ?, ?)";
  console.log(req.body)
  db.query(query, [req.body.name, req.body.begining_date, req.body.ending_date, req.body.prize_pool], (err, results) => {
    if (err) throw err;
    res.json({ message: 'League created successfully', id: results.insertId });
  });
});

router.put('/:id', (req, res) => {
  const query = "UPDATE league SET name = ?, begining_date = ?, ending_date = ?, prize_pool = ? WHERE id = ?";
  db.query(query, [req.body.name, req.body.begining_date, req.body.ending_date, req.body.prize_pool, req.params.id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'League updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const query = "DELETE FROM league WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'League not found' });
    }
    res.json({ message: 'League deleted successfully' });
  });
});

module.exports = router;
