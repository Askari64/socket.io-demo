# Socket.IO Demo App

This is a learning implementation of WebSockets using Socket.IO. The application demonstrates real-time communication where users can broadcast messages to all connected clients or send messages to specific rooms.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/socket-io-demo-app.git
   cd socket-io-demo-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running the Application

To start both the backend and frontend servers concurrently, run:

```bash
npm start
```

This command uses the `concurrently` package to run both servers:
* **Backend:** Runs on `http://localhost:3000`
* **Frontend:** Runs on `http://localhost:5173`

## 🧪 Features

* **Broadcast Messages:** Send messages to all connected clients.
* **Room Messaging:** Send messages to clients in a specific room.
* **Join Rooms:** Clients can join rooms to receive targeted messages.

## 📝 Usage Instructions

1. **Join a Room:**
   * In the frontend interface, enter a room name in the **Enter Room Name** field.
   * Click the **Join Room** button to join the specified room.

2. **Send a Message:**
   * To broadcast a message to all clients:
      * Leave the **Room** field empty.
      * Enter your message in the **Message** field.
      * Click the **Send** button.
   * To send a message to a specific room:
      * Enter the room name in the **Room** field.
      * Enter your message in the **Message** field.
      * Click the **Send** button.

3. **Direct Messaging:**
   * To send a message to a specific client:
      * Enter their `socket.id` in the **Room** field.
      * Ensure that the target client has joined a room named after their `socket.id`.
      * Enter your message and click **Send**.

## 🛠️ Built With

* **Frontend:**
   * React
   * Vite
   * Material-UI (MUI)
* **Backend:**
   * Node.js
   * Express
   * Socket.IO