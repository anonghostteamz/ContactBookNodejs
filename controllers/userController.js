const express = require("express") 
const bcrypt = require("bcrypt") 
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel") 

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    console.log("username ", req.body) 
    const { username, email, password } = req.body;
    console.log("1")
    if (!username || !email || !password) {
      res.status(400);
      console.log("All field is required") 
      throw new Error("All fields are mandatory!");
    }
    console.log("2")
    const userAvailable = await UserModel.findOne({ email });
    if (userAvailable) {
      res.status(400);
      console.log("User already registered!") 
      throw new Error("User already registered!");
    }
  
    console.log("generating hash pass")
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
  
    console.log(`User created ${user}`);
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400);
      throw new Error("User data us not valid");
    }
    res.json({ message: "Register the user" });
  });


//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const user = await UserModel.findOne({ email });
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {

      console.log(user, process.env.ACCESS_TOKEN_SECERT)
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "2 days" }
      );
      console.log(accessToken)
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("email or password is not valid");
    }
  });


//@desc Current user
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) =>{
    res.json(req.user) 
})


module.exports = {registerUser, loginUser, currentUser}