const { Thought, User, Reaction } = require('../models'); // Import the Thought, User, and Reaction models
const { Types } = require('mongoose'); // Import Types from mongoose for ObjectId handling

// Define the ThoughtController object with methods for handling API requests related to thoughts
const ThoughtController = {
  // 1. Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts); // Send back all thoughts as JSON
    } catch (err) {
      res.status(500).json(err); // Handle errors with status code 500
    }
  },

  // 2. Get a thought by ID
  async getThoughtsById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' }); // Handle case where thought is not found
      } else {
        res.json(thought); // Send back the thought data as JSON
      }
    } catch (err) {
      res.status(500).json(err); // Handle errors with status code 500
    }
  },

  // 3. Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.status(201).json(thought); // Send back the created thought data with status code 201
    } catch (err) {
      res.status(500).json(err); // Handle errors with status code 500
    }
  },

  // 4. Delete a thought by ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' }); // Handle case where thought is not found
      } else {
        res.status(200).json({ message: 'Thought deleted successfully', thought }); // Send success message and deleted thought
      }
    } catch (err) {
      res.status(500).json(err); // Handle errors with status code 500
    }
  },

  // 5. Update a thought by ID
  async updateThoughtById(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' }); // Handle case where thought is not found
      } else {
        res.json(thought); // Send back the updated thought data as JSON
      }
    } catch (err) {
      res.status(500).json(err); // Handle errors with status code 500
    }
  },

  // 6. Create a reaction for a thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }, // Add reaction to the reactions array, avoiding duplicates
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' }); // Handle case where thought is not found
      } else {
        res.json(thought); // Send back the updated thought with new reaction
      }
    } catch (e) {
      res.status(500).json(e); // Handle errors with status code 500
    }
  },

  // 7. Delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Remove reaction from the reactions array
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' }); // Handle case where thought is not found
      } else {
        res.json(thought); // Send back the updated thought with reaction removed
      }
    } catch (e) {
      res.status(500).json(e); // Handle errors with status code 500
    }
  },
};

// Export ThoughtController for use in routes
module.exports = ThoughtController;