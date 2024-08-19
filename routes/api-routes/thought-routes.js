// Import the necessary dependencies and controllers
const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  createThought,
  deleteThought,
  updateThoughtById,
  createReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

// Define routes for handling thoughts
// GET all thoughts and POST a new thought
router.route('/')
  .get(getAllThoughts) // Retrieve all thoughts
  .post(createThought); // Create a new thought

// Define routes for handling a specific thought by ID
// GET, PUT, and DELETE a thought by ID
router.route('/:thoughtId')
  .get(getThoughtsById) // Retrieve a specific thought by ID
  .put(updateThoughtById) // Update a specific thought by ID
  .delete(deleteThought); // Delete a specific thought by ID

// Define route for adding a reaction to a thought
// POST a reaction to a specific thought
router.route('/:thoughtId/reactions')
  .post(createReaction); // Add a reaction to a specific thought

// Define route for removing a reaction from a thought
// DELETE a specific reaction from a thought
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction); // Remove a specific reaction from a specific thought

// Export the router to be used in other parts of the application
module.exports = router;