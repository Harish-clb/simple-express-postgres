const router = require("express").Router();

const controller = require("../controllers/user.controller");

// Get all users
router.get("/", controller.getAllUsers);

// Get user by id
router.get("/:id", controller.getUserById);

// Create a new user
router.post("/", controller.createUser);

// Update user by id
router.put("/:id", controller.updateUser);

// Delete user by id
router.delete("/:id", controller.deleteUser);

module.exports = router;
