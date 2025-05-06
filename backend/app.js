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

/*
Socket.IO Emit Methods Overview:

1. socket.emit(event, data)
   - Sends to: Only the sender (current socket).
   - Use case: Private messages or acknowledgments to the initiating client.

2. socket.broadcast.emit(event, data)
   - Sends to: All connected clients except the sender.
   - Use case: Notifying others about an action taken by one client.

3. io.emit(event, data)
   - Sends to: All connected clients, including the sender.
   - Use case: Broadcasting messages or updates to everyone.

4. io.to(room).emit(event, data)
   - Sends to: All clients in a specific room, including the sender.
   - Use case: Targeted messaging within a group or room.

5. socket.to(room).emit(event, data)
   - Sends to: All clients in a specific room except the sender.
   - Use case: Notifying room members about an action taken by one member.
*/

io.on("connection", (socket) => {
  console.log("Connected Id", socket.id);

  socket.on("disconnect", () => {
    console.log(`User Disconnected ${socket.id}`);
  });

  socket.on("message", ({room, message}) => {
    socket.to(room).emit("broadcastMessage", message);
  });

  socket.on("join-room", (roomName)=> {
    socket.join(roomName)
  })
});

httpServer.listen(3000, () => {
  console.log(`Server started on ${port}`);
});
