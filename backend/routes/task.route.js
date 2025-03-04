const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const {canUserAccessTask} = require("../middlewares/canUserAccessTask");
const {validateAssignedUser} = require("../middlewares/validateAssignedUser");

router.get('/', tasksController.getAllUserTasks);
router.post('/', validateAssignedUser,tasksController.createTask);
router.patch('/:id',canUserAccessTask,validateAssignedUser, tasksController.updateTaskById);
router.delete('/:id',canUserAccessTask, tasksController.deleteTaskById);

module.exports = router;