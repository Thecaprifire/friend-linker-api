// Import the User and Thought models from their respective files
const User = require('./User'); // Import User model
const Thought = require('./Thought'); // Import Thought model

// Export the User and Thought models as a single module
// This allows for easy access and import in other parts of the application
module.exports = {
  User, // Export User model
  Thought // Export Thought model
};