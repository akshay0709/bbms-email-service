var mongoose = require('mongoose');
var fs = require('fs');
var Broadcast = mongoose.model('Broadcast');
const sendGridMail = require('@sendgrid/mail');
var config = JSON.parse(fs.readFileSync("./config.json"));
sendGridMail.setApiKey(config.sendgridkey);

var sendEmail = function(firstname, lastname, emailTo, subject, message, cb){
    var mailOptions = {
        to: emailTo,
        from: 'akshay.pawar@csu.fullerton.edu',
        subject: subject,
        text: 'Hi' + firstname + ' ' + lastname + ' ' + message,
        html: '<strong> Hi ' + firstname + ' ' + lastname + '</br>' + message + '</strong>',
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

    Broadcast
        .find({'city': request.query.city})
        .exec(function(error, users){
            if(error){
                console.log(error);
                response
                    .status(500)
                    .json(error);
            } else{
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
                response
                    .status(202)
                    .json({'message': 'emails sent.'});
            }
        });
};