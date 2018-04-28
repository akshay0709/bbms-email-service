var express = require('express');
var router = express.Router();

var ctrlEmail = require('../controllers/broadcast.controller.js');

router
    .route('/send')
    .post(ctrlEmail.broadcastByLocation);

router
    .route('/pastbroadcasts/:username')
    .get(ctrlEmail.getPastBroadcastByUsername);
    
module.exports = router;