const express = require('express');
const cors = require('cors');
const path = require('path');
const socketIo = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const config = require('./config/keys.js');
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

//Importing Routes
const users = require('./routes/Users');
const messages = require('./routes/Messages');
const { isObject } = require('util');
//App Routes
app.get('/', (req, res) => {
  res.send('Welcome to Chat Application');
});

app.use('/api/users', users);
app.use('/api/chats', messages);

const io = socketIo(server);

//DB Configuration
mongoose.Promise = global.Promise;
//Connecting To DB
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then((res) => {
    console.log('Connected to DB');
  })
  .catch((err) => console.log(err.message));
mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

// Port Configuration
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
io.on('connection', (socket) => {
  console.log('Connection established');
  socket.on('joining', ({ username, room }, callback) => {
    console.log(username, room);
    let error = true;
    if (error) {
      callback({ error: 'Connection error. Please reload the page' });
    }
  });
  socket.on('disconnect', () => {
    console.log('Connection disconnected');
  });
});
