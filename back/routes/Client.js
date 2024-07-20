// HTTP status codes can be found at https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const express = require('express');
const router = express.Router();
const WorkshopController = require('../handlers/WorkshopController')


router.use(express.json());

router.get('/', (req, res) => {
    res.send('Hello Client!');
    }
);

router.get('/workshops', async (req, res) => {
    try {
        let workshops = await WorkshopController.getWorkshopsById(parseInt(req.body.client_id))
        res.status(200);
        res.send(workshops)
    } catch (err) {
        res.status(201);
        res.send("Unable to fetch workshops")
    }
}
);

router.post('/workshops', async (req, res) => {
    // Format the comma seperated strings into an array of dates
    let body = req.body;
    let arr_date_str = body.dates.split(',');
    let arr_date = [];
    arr_date_str.forEach(element => {
        arr_date.push(new Date(element))
    })
    body.dates = arr_date;
    // Format the comma seperated strings into an array of strings
    let arr_trainer_str = body.assignedTrainers.split(',');
    let arr_trainer = [];
    arr_trainer_str.forEach(element => {
        arr_trainer.push(element)
    })
    body.assignedTrainers = arr_trainer;

    try {
        body.workshopId = await WorkshopController.getLargestWorkshopId() + 1;
        await WorkshopController.submitWorkshopRequest(body);
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