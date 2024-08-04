const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const TrainerController = require('../handlers/TrainerController');
const WorkshopController = require('../handlers/WorkshopController');
const FieldController = require('../handlers/FieldController');

router.use(express.json());

router.get('/', (req, res) => {
    res.send('Hello Admin!');
});

router.get('/form', async (req, res) => {
    try {
        let fields = await FieldController.getFields();
        res.status(200).json(fields);
    } catch (err) {
        res.status(500).send("Unable to fetch fields");
    }
});

router.post('/form', async (req, res) => {
    try {
        await FieldController.setFields(req);
        res.status(200).send("Success");
    } catch (err) {
        res.status(500).send("Unable to set fields");
    }
});

// DONE : GET /admin/workshops
router.get('/workshops', async (req,res) => {
    console.log("GET workshops");
    try {
        let workshops = await WorkshopController.getAllWorkshops();
        res.status(200);
        res.send(workshops)
    } catch (err) {
        res.status(201);
        res.send("Unable to fetch workshops")
    }
})
// DONE : GET /admin/workshops/workshop_id
router.get('/workshops/:workshop_id', async (req,res) => {
    try {
        let workshops = await WorkshopController.getWorkshopByWorkshopId(req.params.workshop_id);
        res.status(200);
        res.send(workshops)
    } catch (err) {
        res.status(201);
        res.send("Unable to fetch workshops")
    }
})
// DONE : POST /admin/workshops/workshop_id
router.post('/workshops/:workshop_id', async (req,res) => {
    try {
        console.log(req);
        let workshops = await WorkshopController.replaceWorkshopByWorkshopId(req, req.params.workshop_id);
        res.status(200);
        res.send("Success")
    } catch (err) {
        res.status(201);
        res.send(err)
    }
})
// DONE : GET /admin/trainers
router.get('/trainers', async (req,res) => {
    try {
        let p = await TrainerController.getAllTrainers();
        res.status(200);
        res.send(p);
    } catch (err) {
        res.status(201);
        res.send(err);
    }
})
// DONE : GET /admin/trainers/trainer_id
router.get('/trainers/:trainer_id', async (req,res) => {
    try {
        let p = await TrainerController.getTrainerById(req.params.trainer_id);
        res.status(200);
        res.send(p);
    } catch (err) {
        res.status(201);
        res.send(err);
    }
})
// DONE : POST /admin/trainers/trainer_id
router.post('/trainers/:trainer_id', async (req,res) => {
    try {
        let trainer = await TrainerController.replaceTrainerbyTrainerId(req.body, req.params.trainer_id)
        res.status(200);
        res.send("Success")
    } catch (err) {
        res.status(201);
        res.send("Unable to fetch workshops")
    }
})
// DONE : Creates a trainer
router.post('/trainers',(req, res) => {
    TrainerController.createTrainer(req).then(() => res.send("Success")).catch((err) => res.send(err));
})


module.exports = router;