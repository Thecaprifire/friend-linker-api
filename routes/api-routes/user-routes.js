// Import the necessary dependencies and controllers
const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
  // checkFriendRemoved, // Uncomment if you need this route in the future
} = require('../../controllers/user-controller');

// Define routes for user-related requests
// GET all users and POST a new user
router.route('/users')
  .get(getAllUsers) // Retrieve all users
  .post(createUser); // Create a new user

// Define routes for user by ID
// GET user by ID, PUT update user by ID, DELETE user by ID
router.route('/users/:userId')
  .get(getUserById) // Retrieve a specific user by ID
  .put(updateUserById) // Update a specific user by ID
  .delete(deleteUserById); // Delete a specific user by ID

// Define routes for adding and removing friends
// POST add friend and DELETE remove friend
router.route('/users/:userId/friends/:friendId')
  .post(addFriend) // Add a friend to a user
  .delete(removeFriend); // Remove a friend from a user

// Export the router to be used in other parts of the application
module.exports = router;