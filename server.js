const express = require("express");
const cors = require("cors");
const path = require("path");
// const keyFiles = require("./config/keys.js");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const morgan = require("morgan");
const fs = require("fs");
require("dotenv").config()
const { SocketMessaging } = require("./socket/socket.js");
const { SocketCalling } = require('./socket/calling.js')

const app = express();
const server = http.createServer(app);
app.use(cors({origin: '*'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  Morgan logging
app.use(
  morgan("combined", {
    stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
      flags: "a",
    }),
  })
);

//Importing Routes
const users = require("./routes/Users.js");
const messages = require("./routes/Messages.js");
const groups = require("./routes/Groups.js");
const groupmessages = require("./routes/GroupMessages.js");

// // App Routes
// app.get("/", (req, res) => {
//   res.send("Welcome to Chat Application");
// });

app.use("/api/users", users);
app.use("/api/messages", messages);
app.use("/api/groups", groups);
app.use("/api/groupmessages", groupmessages);

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
