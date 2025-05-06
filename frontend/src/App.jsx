import { useEffect, useState } from "react";
import socket from "./utils/socket";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Stack,
  Paper,
} from "@mui/material";

function App() {

  //State Variables Start
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");
  const [socketId, setSocketId] = useState("");
  //State Variables Finish


  //useEffect to handle web socket events Start
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      setSocketId(socket.id);
    });

    socket.on("broadcastMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  //useEffect to handle web socket events Finish


//handler functions Start
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };
  //handler functions Finish
  

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Socket ID: {socketId}
        </Typography>

        <Box component="form" onSubmit={handleJoinRoom} sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            label="Enter Room Name"
            variant="outlined"
          />
          <Button type="submit" variant="contained">
            Join Room
          </Button>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label="Message"
            variant="outlined"
          />
          <TextField
            fullWidth
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            label="Room"
            variant="outlined"
          />
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Box>

        <Stack spacing={2}>
          {messages.map((msg, idx) => (
            <Paper key={idx} sx={{ p: 2 }}>
              <Typography variant="body1">{msg}</Typography>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}

export default App;