// Import the mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB database using the MongoDB URI provided in the environment 
// variables, or use the default URI if the environment variable is not set
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/friendlinker', {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});

// Log connection success
mongoose.connection.once('open', () => {
  console.log('Successfully connected to the MongoDB database.');
});

// Handle connection errors
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Export the connection to the database as a module
module.exports = mongoose.connection;