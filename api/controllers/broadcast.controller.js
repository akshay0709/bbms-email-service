var mongoose = require('mongoose');
var fs = require('fs');
var Broadcast = mongoose.model('Broadcast');
var BroadcastData = mongoose.model('BroadcastData');
const sendGridMail = require('@sendgrid/mail');
var config = JSON.parse(fs.readFileSync("./config.json"));
sendGridMail.setApiKey(process.env.SENDGRID_KEY);

var sendEmail = function(firstname, lastname, emailTo, subject, message, cb){
    var mailOptions = {
        to: emailTo,
        from: 'akshay.pawar@csu.fullerton.edu',
        subject: subject,
        text: 'Hi' + firstname + ' ' + lastname + ' ' + message,
        html: '<html><head></head><body><p>Hello '+ firstname + ' ' + lastname  + ',<br>' + message + '</p></body></html>'
    };
    sendGridMail.send(mailOptions, function(error, response){
         cb(error, response);
    });
};

module.exports.broadcastByLocation = function(request,response){
    console.log('Entered sendEmail function');
    console.log(request.query.city);
    console.log(request.body.subject);
    console.log(request.body.message);
    console.log(request.body.username);
    Broadcast
        .find({'city': request.query.city})
        .exec(function(error, users){
            if(error){
                console.log(error);
                response
                    .status(500)
                    .json(error);
            } else if(users.length == 0){
                response
                    .status(404)
                    .json({'message': 'Not found'});
            } else {
                users.forEach(function(user){
                    var firstname = user.firstname;
                    var lastname = user.lastname;
                    var emailTo = user.email;
                    sendEmail(firstname, lastname, emailTo, request.body.subject, request.body.message, function(error, resp){
                        if(error){
                            console.log('Error occured for ' + firstname + ' ' + lastname);
                        }
                    });
                });
                BroadcastData.create({
                    username : request.body.username,
                    subject : request.body.subject,
                    message : request.body.message,
                    city : request.query.city,
                    count : users.length
                }, function(error, respbd){
                    if(error){
                        console.log('Failed to store broadcast for' + request.body.username);
                    }
                });
                response
                    .status(202)
                    .json({'message': 'emails sent.'});
            }
        });
};

module.exports.getPastBroadcastByUsername = function(request, response){
    console.log('Entered get broadcast');

    BroadcastData
        .find({'username': request.params.username})
        .sort({'date' : -1})
        .exec(function(error, broadcasts){
            if(error){
                response
                    .status(500)
                    .json(error)
            } else if(broadcasts.length == 0){
                response
                    .status(404)
                    .json({'message': 'Not found'})
            } else{
                response
                    .status(200)
                    .json(broadcasts)
            }
        })
};