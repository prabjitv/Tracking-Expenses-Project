const router = require("express").Router();
// Import our controllers
const postRoutes = require("./postsController");
const userRoutes = require("./usersController");
const coordinateRoutes = require("./coordinateController");

// Hook up to the router
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/coordinates", coordinateRoutes);



// Export the router
module.exports = router;
