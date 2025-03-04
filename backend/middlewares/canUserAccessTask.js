const Task = require('../models/task.model');
const Team = require("../models/team.model");
const AppError = require("../utils/appError");

module.exports.canUserAccessTask = async (req, res, next) => {
    try {
        const user = req.user;
        const taskId = req.params.id;

        // Fetch task
        const task = await Task.findById(taskId);
        if (!task) {
            return next(new AppError("Task not found", 404));
        }

        // Manager has full access
        if (user.role === 'Manager') {
            return next();
        }

        // Employee can access if they created or were assigned the task
        if (user.role === 'Employee') {
            console.log('user:', user);
            if (
                (task.assignedTo && task.assignedTo.toString() === user._id.toString()) ||
                (task.createdBy && task.createdBy.toString() === user._id.toString())
            ) {
                return next();
            }
        }

        // Team Lead can access tasks assigned to their team
        if (user.role === 'Team Lead') {
            const teamLeadCanAccess = await Team.aggregate([
                { $match: { teamLead: user._id } },
                { $unwind: '$members' },
                {
                    $group: {
                        _id: null,
                        members: { $addToSet: '$members' }
                    }
                },
                { $project: { _id: 0, members: 1 } }
            ]);

            const allowedUserIds = teamLeadCanAccess.length > 0
                ? teamLeadCanAccess[0].members.map(id => id.toString()).concat(user._id.toString())
                : [user._id.toString()];

            if (
                (task.createdBy && allowedUserIds.includes(task.createdBy.toString())) ||
                (task.assignedTo && allowedUserIds.includes(task.assignedTo.toString()))
            ) {
                return next();
            }
        }

        // If none of the conditions pass, access is denied
        return next(new AppError("Forbidden resource", 403));
    } catch (error) {
        return next(new AppError("Something went wrong while checking access", 500));
    }
};
