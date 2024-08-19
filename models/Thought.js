const { Schema, model } = require('mongoose'); 
const reactionSchema = require('./Reaction'); // Import the Reaction schema

// Define the Thought schema with the required fields and their respective data types
const thoughtSchema = new Schema(
  {
    // Text content of the thought with length constraints
    thoughtText: {
      type: String,
      required: true, // Thought text is required
      minlength: 1,   // Minimum length of the thought text
      maxlength: 280, // Maximum length of the thought text
    },
    // Timestamp of when the thought was created
    createdAt: {
      type: Date,
      default: Date.now, // Default to the current date and time
      get: timestamp => new Date(timestamp).toLocaleString(), // Format date as a locale string
    },
    // Username of the person who created the thought
    username: {
      type: String,
      required: true, // Username is required
    },
    // Array of reactions associated with the thought
    reactions: [reactionSchema], // Use the imported Reaction schema
  },
  {
    toJSON: {
      getters: true, // Enable getters for JSON output
      virtuals: true, // Include virtual properties in JSON output
    },
    id: false, // Do not include the 'id' field in the JSON output
  }
);

// Define a virtual property 'reactionCount' to return the number of reactions
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length; // Return the length of the reactions array
});

// Create the Thought model from the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model as a module
module.exports = Thought;