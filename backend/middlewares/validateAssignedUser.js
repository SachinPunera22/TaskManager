const User = require('../models/user.model');
const Team = require('../models/team.model');
const AppError = require('../utils/appError');

module.exports.validateAssignedUser = async (req, res, next) => {
    const user = req.user;
    const { assignedTo } = req.body;

    try {
        // If assignedTo is not provided, skip validation
        if (!assignedTo) {
            return next();
        }

        // Manager can assign to anyone, skip further checks
        if (user.role === 'Manager') {
            return next();
        }

        // Employee can only assign to themselves
        if (user.role === 'Employee' && assignedTo.toString() !== user._id.toString()) {
            return next(new AppError("Employees can only assign tasks to themselves", 403));
        }

        // Team Lead can assign tasks only to their team members
        if (user.role === 'Team Lead') {
            const teamLeadCanAccess = await Team.aggregate([
                { $match: { teamLead: user._id } },
                { $unwind: '$members' },
                { $group: { _id: null, members: { $addToSet: '$members' } } },
                { $project: { _id: 0, members: 1 } }
            ]);

            // Ensure members list exists before accessing it
            const membersList = teamLeadCanAccess.length > 0 && teamLeadCanAccess[0].members ? teamLeadCanAccess[0].members : [];
            const allowedUserIds = membersList.map(id => id.toString()).concat(user._id.toString());

            if (!allowedUserIds.includes(assignedTo?.toString())) {
                return next(new AppError("Team Leads can only assign tasks to their team members or themselves", 403));
            }
        }

        next();
    } catch (error) {
        next(new AppError("Something went wrong during validation", 500));
    }
};
