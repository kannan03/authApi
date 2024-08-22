
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const dotenv = require("dotenv").config()
const jwtSecret = process.env.JWT_SECRET ;
const PORT = process.env.PORT || 5000;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '2m';

exports.authenticateUser = async (username, password, res) => {
  try{
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
  
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(401).json({ error: 'Account is locked' });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.failedLoginAttempts = user.failedLoginAttempts + 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
        user.failedLoginAttempts = 0;
      }
      await user.save();
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Reset failed login attempts
    await User.updateOne({ username }, { $set: { failedAttempts: 0, lockUntil: null, verifyTokenLink : false } });
    const token = jwt.sign({ user_id: user._id, username : user.username }, jwtSecret, { expiresIn: jwtExpiresIn });

    // Create the verification link
    const verificationLink = `http://localhost:5000/api/auth/verifyLink/${token}`;
    return { token, verificationLink};

  }catch(error){
     console.log("authenticateUser service something went wrong", error)
     return error;
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
    console.log("createUser service something went wrong----------------------------", error)
    return error;
  }
};

exports.verifyOneTimeLink = async (token, res) =>{
  try{
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findById(payload.user_id);
    if (!user || user.verifyTokenLink) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    user.verifyTokenLink = true;
    await user.save();
    return payload;
  }catch(error){
    console.log("verifyOneTimeLink service something went wrong", error)
    return error;
  }
}