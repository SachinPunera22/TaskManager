const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const {canUserAccessTask} = require("../middlewares/canUserAccessTask");
const {validateCreateTask} = require("../middlewares/validateCreateTask");

router.get('/', tasksController.getAllUserTasks);
router.post('/', validateCreateTask,tasksController.createTask);
router.patch('/:id',canUserAccessTask, tasksController.updateTaskById);
router.delete('/:id',canUserAccessTask, tasksController.deleteTaskById);

module.exports = router;