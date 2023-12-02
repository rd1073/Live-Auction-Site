const express = require('express');
const mongoose = require("mongoose");
const { User, Product}=require("./config/db")
const userRoutes=require("./routes/userRoutes");
 
const app = express();
const PORT = 4000;



//New imports
const http = require('http').Server(app);
const cors = require('cors');
app.use(express.json());
app.use(cors());



app.use(
    cors({
      origin: "http://localhost:3000",
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      // <-- location of the react app were connecting to
      credentials: true,
    })
  );
app.use(cors());


const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

socket.on('addProduct', (data) => {
  console.log(data); //logs the message from the client
});
});

app.use("/api/user", userRoutes);




 

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});