// routes/matches.js
const express = require('express');
const router = express.Router();
const db = require("../db");

router.get('/', (req, res) => {
  // Handle GET /matches request
  const query = "SELECT * FROM football_match";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const query = "INSERT INTO football_match (visitor_team_id, local_team_id, visitor_score, local_score, league_id) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [req.body.visitor_team_id, req.body.local_team_id, req.body.visitor_score, req.body.local_score, req.body.league_id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Match created successfully', id: results.insertId });
  });
});

router.get('/:id', (req, res) => {
  // Handle GET /matches/:id request
  const query = "SELECT * FROM football_match WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json(results[0]);
  });
});

router.put('/:id', (req, res) => {
  const query = "UPDATE football_match SET visitor_team_id = ?, local_team_id = ?, visitor_score = ?, local_score = ?, league_id = ? WHERE id = ?";
  db.query(query, [req.body.visitor_team_id, req.body.local_team_id, req.body.visitor_score, req.body.local_score, req.body.league_id, req.params.id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'Match updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const query = "DELETE FROM football_match WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json({ message: 'Match deleted successfully' });
  });
});

module.exports = router;
