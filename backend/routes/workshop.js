const express = require('express');
const workshopModel = require('../models/workshop.js');
var router = express.Router();


// AJAX end points

router.get('/all/', async function(req, res, next) {
    const workshops = await workshopModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(workshops)}`);
});



router.post('/submit/', async function(req, res, next) {
    const code = req.body.code;
    await workshopModel.insertOne(new workshopModel.Workshop(code));
    const workshops = await workshopModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(workshops)}`);
})


router.post('/delete/', async function(req, res, next) {
    const code = req.body.code;
    await workshopModel.deleteOne(code);
    //console.log(code);
    const workshops = await workshopModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(workshops)}`);
})

// View end points
/** render the add dept page */
router.get('/', async function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.render('workshop', { title:'workshop list'})
})


module.exports = router;