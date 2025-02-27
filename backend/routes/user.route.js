const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const {authorizeRole} = require("../middlewares/verifyRole");

router.get("/", usersController.getUsers);

router.get("/me", usersController.getCurrentUser);

router.get("/:id", authorizeRole(["Manager"]), usersController.getUserById);

router.put("/:id", usersController.updateUser)


module.exports = router;
