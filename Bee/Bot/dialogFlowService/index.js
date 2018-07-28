const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app= express()
const config = require(path.resolve('config','index.js'))
var apiai = require('apiai');

var api = apiai(process.env.CLIENT_ACCESS_TOKEN);

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'dialogFlow';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {

        var request = api.textRequest(msg.content.toString(), {sessionId: '100'});

        request.on('response', function(response) {
            ch.assertQueue('dialogFlow_response', {durable: false});
            ch.sendToQueue('dialogFlow_response', new Buffer("done"));
        });
        request.on('error', function(error) {
            console.log(error);
        });

        request.end();
      console.log(" [x] Received %s", msg.content.toString());
  }, {noAck: true});


  });
});





var listener = app.listen(config.PORT,()=>{
    console.log("Welcome to Dialogflow Service , listen to %s",listener.address().port)
})
