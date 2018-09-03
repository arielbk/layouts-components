'use strict';
const Mongo = require('mongodb').MongoClient;
const Client = require('socket.io').listen(4000).sockets;

// connect to mongodb
Mongo.connect('mongodb://127.0.0.1/mongochat', function(err, db) {
  if (err) {
    throw err;
  }

  console.log('connected to mongodb');

  // connect to socket.io
  Client.on('connection', function(socket) {
    let chat = db.collection('chats');

    // create function to send status
    sendStatus = function(s) {
      socket.emit('status', s);
    }

    // get chat from mongo collection
    chat.find().limit(100).sort({_id: 1}).toArray(function(err, res) {
      if (err) {
        throw err;
      }

      // emit the messages
      socket.emit('output', res)
    })

    // handle input event
    socket.on('input', function(data) {
      let name = data.name;
      let message = data.message;

      // check for name and message
      if (name == '' || message == '') {
        // send error status
        sendStatus('Enter a name and message!');
      } else {
        // insert message
        chat.insert({name: name, message: message}, function() {
          client.emit('output', [data]);

          // send status object
          sendStatus({
            message: 'Message sent',
            clear: true
          })
        })
      }
    })
    // handle clear
    socket.on('clear', function(data) {
      // remove all chats from the collection
      chat.remove({}, function(){
        // emit cleared
        socket.emit('cleared');
      })
    })
  })
})