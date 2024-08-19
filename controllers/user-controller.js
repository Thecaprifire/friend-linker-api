const { User } = require('../models'); // Import the User model

const UserController = {
  // 1. Get all users
  getAllUsers(req, res) {
    User.find({})
      .then(userData => res.json(userData)) // Send back all user data as JSON
      .catch(err => res.status(500).json(err)); // Handle errors with status code 500
  },

  // 2. Get one user by ID
  getUserById(req, res) {
    User.findById(req.params.userId)
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
        }
        res.json(userData); // Send back the user data as JSON
      })
      .catch(err => res.status(500).json(err)); // Handle errors with status code 500
  },
  
  // 3. Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then(userData => res.json(userData)) // Send back the created user data as JSON
      .catch(err => res.status(500).json(err)); // Handle errors with status code 500
  },

  // 4. Update user by ID
  updateUserById(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true }) // Use findByIdAndUpdate
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
        }
        res.json(userData); // Send back the updated user data as JSON
      })
      .catch(err => res.status(500).json(err)); // Handle errors with status code 500
  },

  // 5. Delete user by ID
  deleteUserById(req, res) {
    User.findByIdAndDelete(req.params.userId) // Use findByIdAndDelete
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
        }
        res.json({ message: 'User deleted successfully' }); // Send back success message
      })
      .catch(err => res.status(500).json(err)); // Handle errors with status code 500
  },

  // 6. Add friend to user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.params.friendId } }, // Add friend ID to friends list
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' }); // Handle case where user is not found
        }
        res.json(userData); // Send back the updated user data as JSON
      })
      .catch(err => res.status(500).json(err)); // Handle errors with status code 500
  },

  // 7. Remove friend from user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }, // Remove friend ID from friends list
      { new: true }
    )
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'No user with this id!' }); // Handle case where user is not found
        }
        // Check if friend was removed
        const removed = !userData.friends.includes(req.params.friendId);
        // Return response with appropriate message
        if (removed) {
          res.json({ message: 'Friend removed successfully!', userData }); // Send back success message
        } else {
          res.json(userData); // Send back updated user data
        }
      })
      .catch(err => res.status(400).json(err)); // Handle errors with status code 400
  },
};

// Export UserController for use in routes
module.exports = UserController;