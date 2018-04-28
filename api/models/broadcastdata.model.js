var mongoose = require('mongoose');

var broadcastDataSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    message: {
        type: String
    },
    city:{
        type: String
    },
    count:{
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {collection : 'broadcastdata'});

mongoose.model('BroadcastData', broadcastDataSchema);