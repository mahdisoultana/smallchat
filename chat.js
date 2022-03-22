const express = require("express");
// const { dirname } = require('path')
const app = express();

const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);

const io = socketio(expressServer);

io.on("connection", (socket) => {
  console.log("io callback runs");

  socket.emit("messageFromServer", { message: "hello from Server" });
  socket.on("messageFromClient", (msg) => {
    console.log(msg);
  });

  socket.on("msg", (msg) => {
    io.emit("addMsg", msg);
  });
});
