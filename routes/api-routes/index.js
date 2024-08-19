// Import express Router
const router = require('express').Router();

// Import user and thought routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Define endpoints for user and thought routes
router.use('/user', userRoutes); // Routes for user-related requests
router.use('/thought', thoughtRoutes); // Routes for thought-related requests

// Export the router to be used in other parts of the application
module.exports = router;