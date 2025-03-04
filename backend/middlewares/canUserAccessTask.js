const Task = require('../models/task.model')
const Team = require("../models/team.model");
const AppError = require("../utils/appError");

module.exports.canUserAccessTask = async (req, res, next) => {
    const user = req.user;
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    if (!task) {
        return false;
    }

    if (user.role === 'Manager') {
        return next()
    }

    if (user.role === 'Employee') {
        if (task.assignedTo.toString() === user.id || task.createdBy.toString() === user.id) {
            return next()
        }
    }

    if (user.role === 'Team Lead') {
        const teamLeadCanEdit = await Team.aggregate([
            {$match: {teamLead: user._id}},
            {$unwind: '$members'},
            {$group: {_id: null, members: {$addToSet: '$members'}}},
            {$project: {_id: 0, members: 1}}
        ]);

        const allowedUserIds = teamLeadCanEdit.length > 0 ? teamLeadCanEdit[0].members.concat(user._id) : [user._id];
        if( allowedUserIds.some(id => id.toString() === task.createdBy.toString() || id.toString() === task.assignedTo.toString())){
            return next();
        }
    }

    const error = new AppError("Forbidden resource", 403);
    return next(error);
};