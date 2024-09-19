// players.js
const express = require('express');
const router = express.Router();
const db = require("../db")

router.get('/', (req, res) => {
  // Handle GET /players request
    db.query('SELECT * FROM football_player', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const query = "INSERT INTO football_player (name, team_id, goal_count, matches_played) VALUES (?, ?, ?, ?)";
  console.log(req.body)
  db.query(query, [req.body.name, req.body.team_id, req.body.goal_count, req.body.matches_played], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Player created successfully', id: results.insertId });
  });
});

router.get('/:id', (req, res) => {
  const query = "SELECT * FROM football_player WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) throw err;
    if (!results[0]) return res.status(404).json({ message: 'Player not found' });
    res.json(results[0]);
  });
});

router.put('/:id', (req, res) => {
  const query = "UPDATE football_player SET name = ?, team_id = ?, goal_count = ?, matches_played = ? WHERE id = ?";
  db.query(query, [req.body.name, req.body.team_id, req.body.goal_count, req.body.matches_played, req.params.id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Player updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const query = "DELETE FROM football_player WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json({ message: 'Player deleted successfully' });
  });
});

module.exports = router;
