import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("Welcome", (s) => {
      console.log(s);
    });

    socket.on("broadcastwelcome", (s) => {
      console.log(s);
    });

    return ()=>{
      socket.disconnect()
    }
  });

  return <div>App</div>;
}

export default App;
