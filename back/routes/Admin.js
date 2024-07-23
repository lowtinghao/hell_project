const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TrainerController = require('../handlers/TrainerController')

router.use(express.json());

router.get('/', (req, res) => {
    res.send('Hello Admin!');
});

router.post('/trainers',(req, res) => {
    let body = req.body;
    body.assigned_trainers = [];
    TrainerController.createTrainer(body).then(() => res.send("Success")).catch((err) => res.send(err));
})

module.exports = router;