var amqp = require('amqplib');

class sender{
    async connect(){
        return amqp.connect('amqp://localhost').then(function(conn) {
          return conn.createChannel().then(function(ch) {
              return ch
          })
        }).catch(console.warn);
    }

    sendMessage(queueName,message){
        this.connect().then((t)=>{
            t.assertQueue(queueName, {durable: false});
            t.sendToQueue(queueName, new Buffer(message));
            console.log(` [x] Sent ${message}to ${queueName}`);

        })
    }
}
module.exports = new sender()
