// routes/teams.js
const express = require('express');
const router = express.Router();
const db = require("../db")

router.get('/', (req, res) => {
  // Handle GET /teams request
    db.query('SELECT * FROM football_team', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const query = "INSERT INTO football_team (name, creation_date, color, owner) VALUES (?, ?, ?, ?)";
  console.log(req.body)
  db.query(query, [req.body.name, req.body.creation_date, req.body.color, req.body.owner], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Team created successfully', id: results.insertId });
  });
});

router.put('/:id', (req, res) => {
  const query = "UPDATE football_team SET name = ?, creation_date = ?, color = ?, owner = ? WHERE id = ?";
  db.query(query, [req.body.name, req.body.creation_date, req.body.color, req.body.owner, req.params.id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Team updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const query = "DELETE FROM football_team WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully' });
  });
});


module.exports = router;
