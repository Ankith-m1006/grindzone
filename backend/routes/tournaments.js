import express from 'express';
import Tournament from '../models/Tournament.js';

const router = express.Router();

// Get all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get tournament by ID
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new tournament
router.post('/', async (req, res) => {
  const tournament = new Tournament(req.body);
  try {
    const newTournament = await tournament.save();
    res.status(201).json(newTournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update tournament
router.put('/:id', async (req, res) => {
  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json(updatedTournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete tournament
router.delete('/:id', async (req, res) => {
  try {
    const deletedTournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!deletedTournament) return res.status(404).json({ message: 'Tournament not found' });
    res.json({ message: 'Tournament deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
