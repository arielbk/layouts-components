'use strict';
const Mongo = require('mongodb').MongoClient;
const Client = require('socket.io').listen(4000).sockets;

// connect to mongodb
Mongo.connect('mongodb://127.0.0.1:27017', function(err, client) {
  if (err) {
    throw err;
  }

  // this is a change from MongoDB 4 and up
  const db = client.db('mongochat')
  console.log('connected to mongodb');

  // connect to socket.io
  Client.on('connection', socket => {
    const chat = db.collection('chats');

    // create function to send status
    const sendStatus = s => {
      socket.emit('status', s);
    }

    // get chat from mongo collection
    chat.find().limit(100).sort({_id: 1}).toArray((err, res) => {
      if (err) throw err;

      // emit the messages
      socket.emit('output', res)
    })

    // handle input event
    socket.on('input', data => {
      const [name, message] = data;

      // check for name and message
      if (!name || !message) {
        // send error status
        sendStatus('Enter a name and message!');
      } else {
        // insert message
        chat.insertOne({name: name, message: message}, () => {
          Client.emit('output', [data]);

          // send status object
          sendStatus({
            message: 'Message sent',
            clear: true
          })
        })
      }
    })
    // handle clear
    socket.on('clear', () => {
      // remove all chats from the collection
      chat.remove({}, () => {
        // emit cleared
        socket.emit('cleared');
      })
    })
  })
})