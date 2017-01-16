'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const db = require('./db');

app.set('port', (process.env.PORT || 3000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// Process application/json
app.use(bodyParser.json())


// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})



app.post('/', function (req, res) {
  var data = req.body;
 // Make sure this is a page subscription
 if (data.object === 'page') {
      // Iterate over each entry - there may be multiple if batched
      data.entry.forEach(function(entry) {
        var pageID = entry.id;
        var timeOfEvent = entry.time;
        // Attributes to be added via migrations 
        // var MISR_ITALIA = "227178647739997";
        // var MISR_ITALIA_MESSAGE = "Welcome to Misr-italia :) ";
        // var MISR_ITALIA_PID = 1 ;

        // console.log(pageID);
        
        // Iterate over each messaging event
        entry.messaging.forEach(function(event) {
          if (event.message) {
             // console.log(iterativeArrayObjs);
             var SELECT_SYSTEM_QUERY  = {facebookPageId:pageID};
                var iterativeArrayObjs = [];
                db.query('SELECT  id,systemName,facebookPageId FROM  systems WHERE ?', SELECT_SYSTEM_QUERY, function(err, result) {
                  if (err) throw err;
                  // console.log(result[0].id);
                  var SELECT_PROJECT_QUERY  = {systemId:result[0].id};
                  var iterativeArrayObjs = [];
                  db.query('SELECT  id ,projectName title,projectSubtitle subtitle,projectLink item_url,projectImage image_url FROM projects WHERE ?', SELECT_PROJECT_QUERY, function(err, system_result) {
                      if (err) throw err;
                      // console.log(system_result);
                       for (var i = 0; i < system_result.length; i++) {
                          var temp = createIterativeObj(system_result[i],"project");
                          iterativeArrayObjs.push(temp);
                        }
                        receivedMessage(event,iterativeArrayObjs,result);
                    });
                });
          }
           else if (event.postback) {
             receivedPostback(event); 
          }
           else {
            // console.log("Webhook received unknown event: ", event);
          }
        });
      });

      // Assume all went well.
      //
      // You must send back a 200, within 20 seconds, to let us know
      // you've successfully received the callback. Otherwise, the request
      // will time out and we will keep trying to resend.
      res.sendStatus(200);
   }
});


app.get('/', function (req, res) {
    // console.log('test get methof');
});
function receivedMessage(event,projectSections,sytstemObj) {
  // Putting a stub for now, we'll expand it in the following steps
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  var MISR_ITALIA_MESSAGE = "Welcome to "+sytstemObj[0].systemName+" :) ";

  // console.log("Receieved message from page %d",recipientID);
  // console.log("Received message for user %d and page %d at %d with message:", 
  //   senderID, recipientID, timeOfMessage);
  // console.log("Received message from page %d ", recipientID);
  // console.log( event.recipient);
  // console.log(JSON.stringify(message));
  var messageId = message.mid;
  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {
    messageText = messageText.toLowerCase();
    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      // case 'generic':
      //   sendGenericMessage(senderID,projectSections);
      //   break;

      case 'hi':
      case 'hello':
      case 'hey':
        sendTextMessage(senderID,MISR_ITALIA_MESSAGE);
        sendGenericMessage(senderID,projectSections);

        break;

      default:
        sendTextMessage(senderID,messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
 
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback 
  // button for Structured Messages. 
  console.log(event.postback.payload);
  var payload_arr_split = event.postback.payload.split("_");
  var item_id = payload_arr_split[1];

  var SELECT_ITEM_QUERY = {projectId:item_id};
  if(payload_arr_split[0]=="project"){
      var iterativeArrayObjs = [];
            db.query('SELECT  id ,unitName title,unitSubtitle subtitle, unitLink item_url,unitImage image_url FROM units WHERE ?', SELECT_ITEM_QUERY, function(err, units_result) {
              if (err) throw err;
              for (var i = 0; i < units_result.length; i++) {
                var temp = createIterativeObj(units_result[i],"unit");
                iterativeArrayObjs.push(temp);
              }
              if(units_result.length>0){
                sendGenericMessage(senderID,iterativeArrayObjs);
              }
            });

      var SELECT_PROJECT_QUERY  = {id:item_id};
            var iterativeArrayObjs = [];
            db.query('SELECT  id ,projectName FROM projects WHERE ?', SELECT_PROJECT_QUERY, function(err, project_result) {
                if (err) throw err;
                  sendTextMessage(senderID, "Here are "+project_result[0].projectName+" units :- ");
            });
  }
  else{
    var SELECT_ITEM_QUERY = {id:item_id};
    db.query('SELECT  unitName FROM units WHERE ?', SELECT_ITEM_QUERY, function(err, units_result) {
              if (err) throw err;
              if(units_result.length>0){
                sendTextMessage(senderID,units_result[0].unitName);
              }
            });
    }
}

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: "EAAYbYelkZBUABAH9Xtdvxxeq5qiqd4MN0lYRfg80o1IYAGDovESbV0ZAHmKC9ZAvIB8PPiUnbsEANnou4Lo1YIuurTfZABbmXpwslXNzZAf10X2YjZATZBcSwXZAFX0sKWQr6XeCEvnfkTNsZBECQRrN7XDctF7pZCZB1whDaQYP3ccxAZDZD" },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      // console.log("Successfully sent generic message with id %s to recipient %s", 
      //   messageId, recipientId);

    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}

function sendGenericMessage(recipientId,iterativeArrayObjs) {
  // console.log('here in generic FUNC');
  // console.log(iterativeArrayObjs);
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: iterativeArrayObjs
        }
      }
    }
  };

  callSendAPI(messageData);
}

function createIterativeObj(iterativeObj,iterative_type){
 var GLOBAL_PATH = "https://m.epsilonsocial.com/";
 var obj = {
            title: iterativeObj.title,
            subtitle: iterativeObj.subtitle,
            item_url: iterativeObj.item_url,               
            image_url: GLOBAL_PATH+iterativeObj.image_url,
            buttons: [{
              type: "web_url",
              url: iterativeObj.item_url,
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Select",
              payload: iterative_type+"_"+iterativeObj.id,
            }]
          };
          return obj ;
}