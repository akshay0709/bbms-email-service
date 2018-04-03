var mongoose = require('mongoose');
var fs = require('fs');
var Broadcast = mongoose.model('Broadcast');
const sendGridMail = require('@sendgrid/mail');
var config = JSON.parse(fs.readFileSync("./config.json"));
sendGridMail.setApiKey(config.sendgridkey);

var sendEmail = function(firstname, lastname, emailTo){
    console.log(firstname);
    var mailOptions = {
        to: emailTo,
        from: 'akshay.pawar@csu.fullerton.edu',
        subject: 'Blood Donation Camp',
        text: 'Hi' + firstname + ' ' + lastname + 'there is a blood donation drive nearby.',
        html: '<strong> Hi ' + firstname + ' ' + lastname + ' there is a blood donation drive nearby.</strong>',
    };
    sendGridMail.send(mailOptions);   
};

module.exports.broadcastByLocation = function(request,response){
    console.log('Entered sendEmail function');
    console.log(request.params.location);

    Broadcast
        .find({'city': request.params.location})
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
                    sendEmail(firstname, lastname, emailTo);
                });
            }
        });
};