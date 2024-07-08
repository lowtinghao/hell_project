const express = require('express');
const clientModel = require('../models/client.js');
var router = express.Router();


// AJAX end points

router.get('/all/', async function(req, res, next) {
    const clients = await clientModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(clients)}`);
});



router.post('/submit/', async function(req, res, next) {
    const name = req.body.name;
    const code = req.body.code;
    await clientModel.insertOne(clientModel.Client.newClient(name, code));
    const clients = await clientModel.all();
    res.set('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.send(`${JSON.stringify(clients)}`);
})


router.get('/', async function(req, res, next) {
    res.render('client', { title:'client'})
});

module.exports = router;