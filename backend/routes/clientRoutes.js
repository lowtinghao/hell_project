// backend/routes/clientRoutes.js
const express = require('express');
const clientModel = require('backend/routes/clientRoutes.js'); 
const router = express.Router();

// GET API to fetch all clients
router.get('/all/', async (req, res) => {
  try {
    const clients = await clientModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.json(clients); // Send JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST API to add a new client
router.post('/submit/', async (req, res) => {
  const { name, code } = req.body;
  try {
    const newClient = new clientModel.Client({ name, code });
    await clientModel.insertOne(newClient);
    const clients = await clientModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.json(clients); // Send JSON response
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Render the client page
router.get('/', (req, res) => {
  res.render('client', { title: 'client' });
});

module.exports = router;
