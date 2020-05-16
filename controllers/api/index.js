const router = require("express").Router();
// Import our controllers
const postRoutes = require("./postsController");
const userRoutes = require("./usersController");
const coordinateRoutes = require("./coordinateController");
const categoryRoutes = require("./categoryController");


// Hook up to the router
router.use("/posts", postRoutes);
router.use("/users", userRoutes);
router.use("/coordinates", coordinateRoutes);
router.use("/category", categoryRoutes);


// Export the router
module.exports = router;
