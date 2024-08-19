// Import required packages and files
const express = require('express');
const db = require('./config/connection'); // Database connection
const routes = require('./routes'); // Application routes

// Set up environment variables
const PORT = process.env.PORT || 3001;
const app = express();

// Use middleware to parse incoming data
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data
app.use(express.json()); // For parsing JSON data

// Use routes defined in routes.js
app.use(routes);

// Connect to the MongoDB database and start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

// Handle database connection errors
db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});