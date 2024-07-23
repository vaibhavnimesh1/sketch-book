const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

const server = createServer(app);
const io = new Server(server, { cors: "http://localhost:3000" });

io.on("connection", (socket) => {
  socket.emit("hello", "wewe");

  socket.on("drawPath", (arg) => {
    socket.broadcast.emit("drawPath", arg);
  });
  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });
  socket.on("changeConfig", (arg) => {
    console.log(arg);
    socket.broadcast.emit("changeConfig", arg);
  });
});

server.listen(5000, () => {
  console.log("server running at http://localhost:5000");
});
