const router = require('express').Router(); // Import express Router
const apiRoutes = require('./api-routes'); // Import API routes

// Use API routes for any requests starting with /api
router.use('/api', apiRoutes);

// Handle 404 errors for any routes not matched by above routes
router.use((req, res) => {
  return res.status(404).send('Not found');
});

// Export the router to be used in other parts of the application
module.exports = router;