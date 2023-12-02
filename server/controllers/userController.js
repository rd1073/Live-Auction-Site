const { User }=require("../config/db")
const generateToken = require("../config/token");
const bcrypt = require("bcrypt");


const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("Request Body:", req.body);

  
      if (!username || !password) {
        res.status(400).json({ error: "Please Enter all the Fields" });
        return;
      } 
  
      // Check if user already exists
      const user = await User.findOne({ username });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        console.log("login succesful");
        res.json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
          });
      } else{
        res.status(401);
        throw new Error("Invalid Email or Password");

      }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error probably" });
}};


const registerUser = async (req, res) => {
    try {
      const { username, password, fullname, email, sellertype,productstype } = req.body;
      console.log("Request Body:", req.body);
  
      if (!username || !password|| !fullname|| !email|| !sellertype|| !productstype ) {
        res.status(400).json({ error: "Please Enter all the Fields" });
        return;
      }
  
      // Check if user already exists
      const userExists = await User.findOne({ username });
  
      if (userExists) {
        res.status(400).json({ error: "User already exists" });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance
      const newUser = new User({
        username,
        password: hashedPassword,
        fullname,
        email,
        sellertype,
        productstype,

      });
  
      // Save the user instance to the database
      const user = await newUser.save();
  
      console.log("User saved:", user);
  
      res.status(201).json({
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        sellertype: user.sellertype,
        productstype: user.productstype,

        token: generateToken(user._id),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error probably" });
    }
  };


  module.exports={loginUser, registerUser}
  
