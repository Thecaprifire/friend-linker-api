const { Schema, Types } = require('mongoose');

// Define the schema for reactions
const reactionSchema = new Schema(
  {
    // Unique identifier for the reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Generate a new ObjectId by default
    },
    // Content of the reaction
    reactionBody: {
      type: String,
      required: true, // Reaction body is required
      maxLength: 280, // Maximum length of reaction body
    },
    // Username of the person who made the reaction
    username: {
      type: String,
      required: true, // Username is required
    },
    // Timestamp of when the reaction was created
    createdAt: {
      type: Date,
      default: Date.now, // Default to the current date and time
      get: timestamp => new Date(timestamp).toLocaleDateString() // Format date as a locale date string
    },
  },
  {
    toJSON: {
      getters: true, // Apply getters to JSON output
    },
    id: false, // Do not include the 'id' field in the output
  }
);

// Export the schema
module.exports = reactionSchema;