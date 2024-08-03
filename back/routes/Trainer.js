// TODO : GET /trainers/workshops
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TrainerController = require('../handlers/TrainerController');
const WorkshopController = require('../handlers/WorkshopController');

router.use(express.json());

router.get('/', (req, res) => {
    res.send('Hello Admin!');
});

router.get('/workshops', async (req,res) => {
    try {
        let workshops = await WorkshopController.getworkshopsAssignedToTrainer(parseInt(req.body.trainer_id));
        res.status(200);
        res.send(workshops)
    } catch (err) {
        res.status(201);
        res.send(err)
    }
})

module.exports = router;