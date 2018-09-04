'use strict';
const Mongo = require('mongodb').MongoClient;
const Client = require('socket.io').listen(4000).sockets;

// connect to mongodb
Mongo.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, function(err, client) {
  if (err) {
    throw err;
  }

  // this is a change from MongoDB Node driver 3 and up
  // see: https://stackoverflow.com/questions/47662220/db-collection-is-not-a-function-when-using-mongoclient-v3-0
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
      const name = data.name,
            message = data.message,
            time = data.time;

      // check for name and message
      if (!name || !message) {
        // send error status
        sendStatus('Enter a name and message!');
      } else {
        // insert message
        chat.insertOne({name: name, message: message, time: time}, () => {
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
      chat.deleteMany({}, () => {
        // emit cleared
        socket.emit('cleared');
      })
    })
  })
})