const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const logger = require('./config/logger');  // Import the logger
const rateLimit = require('express-rate-limit');
const http = require("http");
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Log every request
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
    headers: true,
});

// Apply rate limiting to all requests
app.use(apiLimiter);

// middleware check
app.use((req,res, next)=>{
  console.log("hello middleware")
  next();
});

// Define Routes
app.use('/api/auth', userRoutes);


const server = http.createServer(app)

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`)
});
