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

socket.on('addProduct', async (data) => {
  //console.log(data); 
  try {
    // Check if data is valid
    if (!data.title || !data.description || !data.price || !data.seller) {
      console.log(`Invalid product data received from client: ${socket.id}`);
      return;
    }

    // Create a new product instance
    const newProduct = new Product({
      title: data.title,
      description: data.description,
      price: data.price, 
      seller: data.seller,
    });

    // Save the product to the database
    await newProduct.save();

    console.log('Product saved to the database:', newProduct);

    } catch (error) {
    console.error('Error handling addProduct event:', error.message);
  }
});


socket.on('bidProduct', async(data) => {
  console.log(data);
  try {
    const { userInput, lastbidder, title } = data;

    // Find the product in the database by title
    const product = await Product.findOne({ title });

    if (!product) {
      console.log(`Product with title ${title} not found.`);
      return;
    }

    
      product.lastBidder = lastbidder;
      product.currentBid = userInput;

      // Save the updated product to the database
      await product.save();

      console.log(`Bid updated for product ${title}. New bid: ${userInput}, Bidder: ${lastbidder}`);

      
  } catch (error) {
    console.error('Error handling bidProduct event:', error.message);
  }
});
});

app.use("/api/user", userRoutes);

app.get('/api', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Return the products as JSON
    res.json(products);
    //console.log(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 });


 

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


 
 