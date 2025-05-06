import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 3000;
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: false,
  },
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("Connected Id", socket.id);

  //sends message/event to current client only
  socket.emit("Welcome", "Welcome to the server ");

  //this emits message/event to other client instance instead of the client instance that refreshes/calls
  socket.broadcast.emit("broadcastwelcome", `${socket.id} has joined`);

  socket.on('disconnect', ()=>{
    console.log(`User Disconnected ${socket.id}`)
  })
});

httpServer.listen(3000, () => {
  console.log(`Server started on ${port}`);
});
