var mongoose = require('mongoose');
var config = require('../../config.js');
var dburl = config.dburl;

mongoose.connect(dburl);

mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to ' + dburl);
});

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});

mongoose.connection.on('error', function(err){
  console.log('Mongoose connection error ' + err);
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination (SIGINT)');
    process.exit(0);
  });
});

process.on('SIGTERM', function(){   //Service providers like Heroku
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination (SIGTERM)');
    process.exit(0);
  });
});

process.once('SIGUSR2', function(){   //Service providers like Heroku
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination (SIGUSR2)');
    process.kill(process.pid, 'SIGUSR2');
  });
});

require('./broadcast.model.js');
require('./broadcastdata.model');