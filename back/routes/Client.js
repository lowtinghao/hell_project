// HTTP status codes can be found at https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const express = require('express');
const router = express.Router();
const WorkshopController = require('../handlers/WorkshopController')
const mongoose = require('mongoose');


router.use(express.json());

// TODO : PUT /client/workshops
router.get('/', (req, res) => {
    res.send('Hello Client!');
    }
);

router.get('/workshops', async (req, res) => {
    try {
        let workshops = await WorkshopController.getWorkshopsByClientId(parseInt(req.body.client_id))
        res.status(200);
        res.send(workshops)
    } catch (err) {
        res.status(201);
        res.send("Unable to fetch workshops")
    }
}
);

router.get('/allworkshops', async (req,res) => {
    try {
        let workshops = await WorkshopController.getAllWorkshops();
        res.status(200);
        res.send(workshops)
    } catch (err) {
        res.status(201);
        res.send("Unable to fetch workshops")
    }
})



router.post('/workshops', async (req, res) => {
    try {
        await WorkshopController.submitWorkshopRequest(req);
        console.log("Successfully Sent");
        res.status(201);
        res.send("Successful Post Request to Workshops");
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send("Failed Post Request to Workshops");
    }
}
);



module.exports = router;