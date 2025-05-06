import express from "express";
import { Server } from "socket.io";
import {createServer} from 'http'

const port = 3000;
const app = express();
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials:false
  }
})

app.get('/', (req, res) =>{
    res.send('Hello World')
})

io.on("connection", (socket)=> {
    console.log('User Connected')
    console.log("Id", socket.id)
})

httpServer.listen(3000, () => {
  console.log(`Server started on ${port}`);
});
