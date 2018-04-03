var mongoose = require('mongoose');

var broadcastInfoSchema = new mongoose.Schema({
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    email:{
        tyoe: String
    },
    city:{
        type: String
    },
    zip:{
        type: Number
    }
}, {collection : 'users'});

mongoose.model('Broadcast', broadcastInfoSchema);