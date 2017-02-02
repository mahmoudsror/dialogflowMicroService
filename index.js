'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const db = require('./db')
var models = require('./models/index');
app.set('port', (process.env.PORT || 3000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// Process application/json
app.use(bodyParser.json())


// Spin up the server
app.listen(app.get('port'), function() {
		console.log('running on port', app.get('port'))
})

app.get('/', function (req, res) {
res.send('Welcome mahmoud To Bot :)');
});

app.post('/', function (req, res) {
	var data = req.body;
 // Make sure this is a page subscription
 if (data.object === 'page') {
			// Iterate over each entry - there may be multiple if batched
			data.entry.forEach(function(entry) {
				var pageID = entry.id;
				//var system_id=0;
				var system_id;
				var iterativeArrayObjs = [];
								var timeOfEvent = entry.time;
				// Iterate over each messaging event
				entry.messaging.forEach(function(event) {
					if (event.message) {
						var senderID = event.sender.id;
						var event_text = event.message.text;
				 //         console.log(event.message.text);
					if (event.message && (!event.message.is_echo)) {

				models.systems.findOne({
					
					where:{facebookPageId:pageID}
					}).then(function(result) {
						system_id = result['dataValues']['id'];
						models.tags.findOne({
					include:[

					{
						model: models.answers,
						as:'tags_answers',
					},
					
					],
					where:{tag:event_text}
					}).then(function(result) {
						var answer_obj = result['dataValues']['tags_answers'];
						for (var i=0;i<answer_obj.length;i++) {
  							var item = answer_obj[i]['dataValues']['answer'];
  							sendTextMessage(senderID,item);
						}
					});



						models.projects.findAll({
						                include:[
						             {
						                        model: models.units,
						                        as:'project_units',
						    
						                    },
						                    {
						                        model: models.systems,
						                        as:'system_projects',
						    
						                    },
						                ],
						            where:{systemId:system_id}
						            }).then(function(result){

						            	   var jsonData = {};
						            	    var iterativeArrayObjs = [];
						            	    var tamp_json=[];
							    result.forEach(function(column) 
							    {
							    	var id= column.dataValues.id;
							    	var title= column.dataValues.projectName;
							    	var subtitle = column.dataValues.projectSubtitle;
							    	var item_url = column.dataValues.projectLink;
							    	var image_url = column.dataValues.projectImage;
							    	jsonData['id']=id;
							    	jsonData['title']=title;
							    	jsonData['subtitle']=subtitle;
							    	jsonData['item_url']=item_url;
							    	jsonData['image_url']=image_url;
							   tamp_json.push(jsonData);


							    });
							 for (var i = 0; i < tamp_json.length; i++) {
									var temp = createIterativeObj(tamp_json[i],"project");

									iterativeArrayObjs.push(temp);
								}
								//console.log(iterativeArrayObjs);
								sendGenericMessage(senderID,iterativeArrayObjs);

						});
						});



  							/* models.user_events.create({
		

						page_id:pageID,
						message:event_text
					}).then(function(user) {
									//console.log(user);
					 //res.json(user);
			//      receivedMessage(event,result,pageID);
													
												});*/
/*models.user_events.build({ page_id:pageID, message:event_text }).save().then(function(anotherTask) {
	console.log(anotherTask);
		// you can now access the currently saved task with the variable anotherTask... nice!
	}).catch(function(error) {
		console.log(error);
		// Ooops, do some error-handling
	})
*/


}

				//      console.log(iterativeArrayObjs);
		 /*        var SELECT_SYSTEM_QUERY  = {facebookPageId:pageID};
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
												receivedMessage(event,iterativeArrayObjs,result,pageID);
										});
								});*/

					}
					else if (event.postback) {
						
						 receivedPostback(event);
						 
					}

					 else {
	 //          console.log("Webhook received unknown event: ", event);
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
function receivedMessage(event,projectSections,sytstemObj,pageID) {
	// Putting a stub for now, we'll expand it in the following steps
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfMessage = event.timestamp;
	var message = event.message;

	var MISR_ITALIA_MESSAGE = "Welcome to "+sytstemObj[0].systemName+" :) ";

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

		/*  case 'hi':
			case 'hello':
			case 'hey':
				sendTextMessage(senderID,MISR_ITALIA_MESSAGE);
				sendGenericMessage(senderID,projectSections);

				break;*/
			default:
	
			var query = db.query('select tag_answers.answer as answers from tag_mapping map left join tags on (map.tag_id = tags.tagID and map.page_id = tags.page_id) join tag_answers on (map.answer_id = tag_answers.id and map.page_id = tag_answers.page_id) where  tags.tag = ?  and  map.page_id = ? ', [messageText , pageID], function(err, system_result) {
				if (err) throw err;
	//     console.log(system_result);
				 for (var i = 0; i < system_result.length; i++) {
						sendTextMessage(senderID,system_result[i]['answers']);
		//    console.log(system_result[i]['answers']);
					}

		 //     receivedMessage(event,iterativeArrayObjs,result);
			});    
		 //console.log(query);
			
			 // sendTextMessage(senderID,messageText);

			}
		}
	}/* else if (messageAttachments) {
		sendTextMessage(senderID, "Message with attachment received");
	}*/

 






function receivedPostback(event) {
	console.log(event);
	var senderID = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfPostback = event.timestamp;

	// The 'payload' param is a developer-defined field which is set in a postback 
	// button for Structured Messages. 
	//console.log(event.postback.payload);
	var payload_arr_split = event.postback.payload.split("_");
	var item_id = payload_arr_split[1];

	var SELECT_ITEM_QUERY = {projectId:item_id};
	if(payload_arr_split[0]=="project"){

		models.units.findAll({
		             include:[
		             {
		                        model: models.projects,
		                        as:'project_units',
		    
		                    },
		                ],
		            where:{projectId:item_id}
		            }).then(function(result){
		         //   	console.log(result);
		            	   var jsonData = {};
		            	    var iterativeArrayObjs = [];
		            	    var tamp_json=[];
			    result.forEach(function(column) 
			    {
			    	var id= column.dataValues.id;
			    	var title= column.dataValues.unitName;
			    	var subtitle = column.dataValues.unitSubtitle;
			    	var item_url = column.dataValues.unitLink;
			    	var image_url = column.dataValues.unitImage;
			    	jsonData['id']=id;
			    	jsonData['title']=title;
			    	jsonData['subtitle']=subtitle;
			    	jsonData['item_url']=item_url;
			    	jsonData['image_url']=image_url;
			   tamp_json.push(jsonData);


			    });
			 for (var i = 0; i < tamp_json.length; i++) {
					var temp = createIterativeObj(tamp_json[i],"project");

					iterativeArrayObjs.push(temp);
				}
				//console.log(iterativeArrayObjs);
				sendGenericMessage(senderID,iterativeArrayObjs);

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
			text: messageText,
		}
	};

	callSendAPI(messageData);
}

function addPersistentMenu(){
 request({
		url: 'https://graph.facebook.com/v2.6/me/thread_settings',
		qs: { access_token: "EAAPEfNPu1PQBAPmJvH75WRnUQrAlJhpvIcNm1RFgKtD4IHog2yZBGRLi4QzKnNoovhi6ETwQWm1QKOPFBWoXWxrJYUqt0IZBfgkv82flmfekpH5IpUl4dk21Pnx4kGGnRxVMUsJbtKOl7bqcj6rGJ0qYPJVx0XwMWEZAcHVYAZDZD" },
		method: 'POST',
		json:{
				setting_type : "call_to_actions",
				thread_state : "existing_thread",
				call_to_actions:[
						{
							type:"postback",
							title:"Add Info",
							payload:"home"
						},
						{
							type:"web_url",
							title:"Visit our website",
							url:"http://www.dynamic-memory.com/"
						}
					]
		}

}, function(error, response, body) {
 //   console.log(response)
		if (error) {
	 //     console.log('Error sending messages: ', error)
		} else if (response.body.error) {
 //       console.log('Error: ', response.body.error)
		}
})

}

/*
function remove_presistent_menu(messageData) {

	request({
		 uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
		qs: { access_token: "EAAPEfNPu1PQBAPmJvH75WRnUQrAlJhpvIcNm1RFgKtD4IHog2yZBGRLi4QzKnNoovhi6ETwQWm1QKOPFBWoXWxrJYUqt0IZBfgkv82flmfekpH5IpUl4dk21Pnx4kGGnRxVMUsJbtKOl7bqcj6rGJ0qYPJVx0XwMWEZAcHVYAZDZD" },
		method: 'DELETE',
						json: {
				setting_type: 'call_to_actions',
				thread_state: 'existing_thread'
			}

	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var recipientId = body.recipient_id;
			var messageId = body.message_id;

			// console.log("Successfully sent generic message with id %s to recipient %s", 
			//   messageId, recipientId);

		} else {
			console.error("Unable to send message.");
	 //  console.error(response);
		 // console.error(error);
		}
	});  
}*/
function callSendAPI(messageData) {

	addPersistentMenu();
	
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: { access_token: "EAAPEfNPu1PQBAPmJvH75WRnUQrAlJhpvIcNm1RFgKtD4IHog2yZBGRLi4QzKnNoovhi6ETwQWm1QKOPFBWoXWxrJYUqt0IZBfgkv82flmfekpH5IpUl4dk21Pnx4kGGnRxVMUsJbtKOl7bqcj6rGJ0qYPJVx0XwMWEZAcHVYAZDZD" },
		method: 'POST',


				json: messageData,

	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var recipientId = body.recipient_id;
			var messageId = body.message_id;

			// console.log("Successfully sent generic message with id %s to recipient %s", 
			//   messageId, recipientId);

		} else {
			console.error("Unable to send message.");

		}
	});  
}

function sendGenericMessage(recipientId,iterativeArrayObjs) {
console.log(iterativeArrayObjs);
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
