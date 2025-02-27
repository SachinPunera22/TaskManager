const Task = require("../models/task.model");
const Team = require("../models/team.model");

const asyncHandler = require("../middlewares/asyncHandler");
const AppError = require("../utils/appError");

exports.getAllUserTasks = asyncHandler(async (req, res, next) => {
    const {role, _id} = req.user; // Extract role and ID from authenticated user

    let userIds = [_id]; // Start with the logged-in user
    let tasks = [];
    if (role === 'Manager') {
        // Manager can access all tasks
        tasks = await Task.find().populate('createdBy assignedTo');
       return res.status(201).json({
            status: "success",
            data: {tasks},
        });
    }

    if (role === 'Team Lead') {
        // Team leader can access tasks of users in teams they lead (aggregation)
        const teamUsers = await Team.aggregate([
            {$match: {teamLead: _id}},
            {$unwind: '$members'},
            {$group: {_id: null, members: {$addToSet: '$members'}}},
            {$project: {_id: 0, members: 1}}
        ]);
        if (teamUsers.length > 0) {
            userIds = userIds.concat(teamUsers[0].members);
        }
    }

    tasks = await Task.find({
        $or: [{assignedTo: {$in: userIds}}, {createdBy: {$in: userIds}}]
    }).populate('createdBy assignedTo');

    res.status(200).json({
        status: "success",
        data: {
            tasks,
        },
    });

});

module.exports.createTask = asyncHandler(async (req, res) => {
    const { name, description, status, assignedTo } = req.body;
    let newTask = await Task.create({
        name,
        description,
        status: status || 'Pending', // Default to Pending
        assignedTo: assignedTo ||  req.user._id, // Task may not have an assignee initially
        createdBy: req.user._id, // User creating the task
    });
    newTask = await newTask.populate('createdBy assignedTo')

    res.status(201).json({
        status: 'success',
        data: { task: newTask }
    });
});

module.exports.updateTaskById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, status, assignedTo } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
        id,
        { name, description, status, assignedTo, },
        { new: true } // Return updated task & validate fields
    ).populate('createdBy assignedTo')

    if (!updatedTask) {
        return res.status(404).json({
            status: 'error',
            message: 'Task not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: { task: updatedTask }
    });
});

exports.deleteTaskById = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        const error = AppError.create("No Task Found with this ID!", 404);
        return next(error);
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});

