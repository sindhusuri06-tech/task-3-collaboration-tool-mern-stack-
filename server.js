const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

let sharedText = "";

io.on("connection", (socket) => {

  console.log("User connected");

  socket.emit("loadText", sharedText);

  socket.on("textChange", (data) => {
    sharedText = data;
    socket.broadcast.emit("updateText", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

});

http.listen(3000, () => {
  console.log("Server running on port 3000");
});
