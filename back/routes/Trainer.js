// TODO : GET /trainers/workshops
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TrainerController = require('../handlers/TrainerController');
const WorkshopController = require('../handlers/WorkshopController');

router.use(express.json());

router.get('/', (req, res) => {
    res.send('Hello Trainer!');
});

// TODO: get workshops only assigned to respective trainer
router.get('/workshops/:trainerid', async (req,res) => {
    try {
        let workshops = await WorkshopController.getworkshopsAssignedToTrainer(parseInt(req.params['trainerid']));
        res.status(200);
        res.send(workshops)
    } catch (err) {
        res.status(201);
        res.send(err)
    }
}) 

/* router.get('/workshops', async (req,res) => {
    try {
        let workshops = await WorkshopController.getAllWorkshops();
        res.status(200);
        res.send(workshops)
    } catch (err) {
        res.status(201);
        res.send("Unable to fetch workshops")
    }
})
 */

module.exports = router;