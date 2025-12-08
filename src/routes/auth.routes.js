const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    console.log("POST /api/auth/register - Email:", req.body.email);
    
    let user = req.body;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    await User.create(user);
    console.log("User created successfully");
    res.status(201).send({ success: true, message: "User created" });
  } catch (err) {
    console.log("REGISTER ERROR:", err.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    console.log("POST /api/auth/login - Email:", req.body.email);
    
    let userCred = req.body;
    let user = await User.findOne({ email: userCred.email });

    if (user) {
      let match = await bcrypt.compare(userCred.password, user.password);

      if (match) {
        let token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET);
        console.log("Login success for:", user.email);
        res.send({ success: true, message: "Login verified", token });
      } else {
        console.log("Wrong password for:", userCred.email);
        res.status(401).send({ success: false, message: "Password is wrong" });
      }
    } else {
      console.log("User not found:", userCred.email);
      res.status(404).send({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.log("LOGIN ERROR:", err.message);
    res.status(500).send({ success: false, message: "Server error" });
  }
});

module.exports = router;