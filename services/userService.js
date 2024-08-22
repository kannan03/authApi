
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const dotenv = require("dotenv").config()
const jwtSecret = process.env.JWT_SECRET ;
const PORT = process.env.PORT || 5000;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '2m';

exports.authenticateUser = async (username, password) => {
  try{
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found")
    }
  
    if (user.lockUntil && user.lockUntil > Date.now()) {
      throw new Error("Account is locked")
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.failedLoginAttempts = user.failedLoginAttempts + 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
        user.failedLoginAttempts = 0;
      }
      await user.save();
      throw new Error("Invalid credentials")
    }

    // Reset failed login attempts
    await User.updateOne({ username }, { $set: { failedAttempts: 0, lockUntil: null, verifyTokenLink : false } });
    const token = jwt.sign({ user_id: user._id, username : user.username }, jwtSecret, { expiresIn: jwtExpiresIn });

    // Create the verification link
    const verificationLink = `http://localhost:5000/api/auth/verifyLink/${token}`;
    return { token, verificationLink};

  }catch(error){
     console.log("authenticateUser service something went wrong", error)
     throw error;
  }
};

exports.createUser = async (bodyData) => {
  try{
    const { username, password} = bodyData;
    const user = new User({
      username,
      password
    });
    await user.save();
    return user;
  }catch(error){
    console.log("createUser service something went wrong", error)
    throw error;
  }
};

exports.verifyOneTimeLink = async (token) =>{
  try{
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findById(payload?.user_id);
    if (!user) {
      throw new Error("Invalid or expired token")
    }
    if (user?.verifyTokenLink) {
      throw new Error("Token already used")
    }
    user.verifyTokenLink = true;
    await user.save();
    return user;
  }catch(error){
    console.log("verifyOneTimeLink service something went wrong", error)
    throw error;
  }
}