const User = require('../models/user.model');
const Team = require('../models/team.model');
const AppError = require('../utils/appError');

module.exports.validateCreateTask = async (req, res, next) => {
    const user = req.user;
    const { createdBy, assignedTo } = req.body;

    try {
        // Ensure createdBy is the same as the user making the request
        if (createdBy && createdBy.toString() !== user.id) {
            return next(new AppError("You can only create tasks under your own user ID", 403));
        }

        // If assignedTo is not provided, skip validation
        if (!assignedTo) {
            return next();
        }

        // Manager can assign to anyone, skip further checks
        if (user.role === 'Manager') {
            return next();
        }

        // Employee can only assign to themselves
        if (user.role === 'Employee' && assignedTo.toString() !== user.id) {
            return next(new AppError("Employees can only assign tasks to themselves", 403));
        }

        // Team Lead can assign tasks only to their team members
        if (user.role === 'Team Lead') {

            const teamLeadCanAccess = await Team.aggregate([
                {$match: {teamLead: user._id}},
                {$unwind: '$members'},
                {$group: {_id: null, members: {$addToSet: '$members'}}},
                {$project: {_id: 0, members: 1}}
            ]);

            const allowedUserIds = teamLeadCanAccess.length > 0 ? teamLeadCanAccess[0].members.concat(user._id) : [user._id];
            if (!allowedUserIds.includes(assignedTo.toString())) {
                return next(new AppError("Team Leads can only assign tasks to their team members or himself", 403));
            }
        }

        next();
    } catch (error) {
        next(new AppError("Something went wrong during validation", 500));
    }
};
