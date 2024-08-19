// Import the required dependencies from the mongoose library
const { Schema, model, Types } = require('mongoose'); 

// Define the User schema with the required fields and their respective data types
const userSchema = new Schema(
  {
    // Username field with unique constraint and trimming of whitespace
    username: {
      type: String,
      required: true, // Username is required
      unique: true,   // Username must be unique
      trim: true,     // Remove leading and trailing whitespace
    },
    // Email field with validation for correct email format using a regex
    email: {
      type: String,
      required: true, // Email is required
      unique: true,   // Email must be unique
      validate: { 
        validator: function(v) {
          return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
        },
        message: props => `${props.value} is not a valid email!` // Error message if validation fails
      }
    },
    // Array of ObjectIds referencing User documents for friends
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
      }
    ],
    // Array of ObjectIds referencing Thought documents
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought', // Reference to the Thought model
      }
    ],
  },
  {
    toJSON: {
      virtuals: true, // Enable virtual properties to be included in JSON output
    },
    id: false, // Do not include the 'id' field in the JSON output
  }
);

// Define a virtual property 'friendCount' to return the number of friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length; // Return the length of the friends array
});

// Create the User model from the userSchema
const User = model('User', userSchema);

// Export the User model as a module
module.exports = User;