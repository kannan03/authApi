const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const logger = require('./logger');  // Import the logger

// dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      logger.info('MongoDB connected');
    });
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};


module.exports = connectDB;
