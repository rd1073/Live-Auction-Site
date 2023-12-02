const mongoose = require("mongoose")

const conn = mongoose.createConnection('mongodb://0.0.0.0:27017/LiveAuction');
conn.on('connected', () => {
  console.log('Mongoose connected mongodb');
});
conn.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});


//users
/*const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    
  });
  */

  const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    sellertype: { type: String, required: true },
    productstype: { type: String, required: true },
    
  });
  const User = conn.model('User', userSchema);

  
  // product schema
  const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    }, // this acts as the initial price
    currentBid: {
      type: Number,
      default: 0,
    },
    seller: {
      type: String,
      ref: 'User',
      required: true,
    },
    lastbidder: {
      type: String,
      ref: 'User',
      
    },
   });
  
  const Product = conn.model('Product', productSchema);
  
  
  module.exports = { User, Product};



 