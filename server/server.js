const dotenv = require("dotenv");
dotenv.config();
const { Server } = require("socket.io");
const http =require("http");

const app =require( "./app.js");

const  connectDB = require("./config/db.js");


connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-board", (boardId) => {
    socket.join(boardId);
    console.log(`Joined board ${boardId}`);
  });
    socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

app.set("io", io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});