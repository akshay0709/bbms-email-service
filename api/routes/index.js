var express = require('express');
var router = express.Router();

var ctrlEmail = require('../controllers/broadcast.controller.js');

router
    .route('/send/:location')
    .post(ctrlEmail.broadcastByLocation);

module.exports = router;