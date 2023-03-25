require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const chalk = require("chalk");
const connectDB = require("./database");

// Console prefix
const consolePrefix = chalk.bgYellow.black("server ") + " - ";
app.use(cookieParser());
// Server PORT
const PORT = process.env.PORT || 5000;

// Cors side request client allowance
const corsOption = {
    credentials: true,
    optionsSuccessStatus: 200,
    origin: ["https://idm-id4u.vercel.app", "http://idm-id4u.vercel.app"],
};
app.use(cors(corsOption));

// Server Storage Folder
app.use("/storage", express.static("storage"));

// Server Upload limit on api
app.use(express.json({ limit: "100mb" }));

// Change Headers of server
// app.use(customHeader);

// Connect database
try {
    async function connect() {
        await connectDB();
    }
    connect();
} catch (error) {
    console.log(error);
}

// Router
const router = require("./router");
app.use(router);

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const userSocketMap = {};
const getAllConnectedClients = (gameID) => {
    // Map
    return Array.from(io.sockets.adapter.rooms.get(gameID) || []).map(
        (socketId) => {
            return {
                socketId,
                gameID,
                username: userSocketMap[socketId],
                status:"IN GAME"
            };
        }
    );
}

io.on("connection", (socket) => {
    console.log(consolePrefix + "socket connected", socket.id);
});
io.on("connection", (socket) => {
    console.log("A user connected.");
    socket.on("get-scoreboard", (gameID) => {
        const clients = getAllConnectedClients(gameID);
        io.emit("scoreboard", clients);
    });
    socket.on("join-room", ({ gameID, username, status}) => {
        userSocketMap[socket.id] = username;
        socket.join(gameID);
        const clients = getAllConnectedClients(gameID);
        io.emit("scoreboard", clients);
        // clients.forEach(({ socketID }) => {
        //     console.log('sending joined to', socketID);
        //     io.to(socketID).emit('joined', {
        //         clients,
        //         username,
        //         socketId: socket.id,
        //     });
        // });
        console.log(`User joined game ${gameID}, username: ${username}`);

        // socket.emit("room-joined", `You have joined room ${gameID}.`);
        // socket
        //     .to(gameID)
        //     .emit("user-joined", "A new user has joined the room.");
    });


    // update scoreboards of that gameID
   socket.on("disconnecting", () => {
        const gameID = Array.from(socket.rooms)[1];
        console.log(gameID);
        let clients = getAllConnectedClients(gameID);
        clients = clients.filter((client) => client.socketId !== socket.id);
        console.log("Clients",clients);
        io.emit("scoreboard", clients);
        delete userSocketMap[socket.id];
        socket.leave();
    });
    
    
    socket.on("disconnect", () => {
        console.log("A user disconnected.", socket.id);
    });
});
server.listen(PORT, () =>
    console.log(consolePrefix + chalk.green(`Listening on port ${PORT}`))
);
