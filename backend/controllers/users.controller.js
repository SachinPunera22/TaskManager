const AppError = require('../utils/appError');
const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/user.model');
const Team = require('../models/team.model');

const mongoSanitize = require("mongo-sanitize");

module.exports.getUserById = asyncHandler(async (req, res, next) => {

    const id = req.params.id;
    const user = await User.findById(id).select('-password');

    if (!user) {
        const error = AppError.create('No User Found!', 404);
        return next(error);
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

// Get current user profile
module.exports.getCurrentUser = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
        const error = AppError.create('No User Found!', 404);
        return next(error);
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

// Get all users (Manager only)
module.exports.getUsers = asyncHandler(async (req, res, next) => {

    const {role, _id} = req.user; // Extract role and ID from authenticated user

    let users;

    if (role === 'Manager') {
        users = await User.find();
    } else if (role === 'Team Lead') {
        // Team leader can access users in teams where he is the leader (single aggregation)
        const teamUsers = await Team.aggregate([
            {$match: {teamLead: _id}}, // Find teams where the logged-in user is the leader
            {$unwind: '$members'}, // Flatten members array
            {$group: {_id: null, members: {$addToSet: '$members'}}}, // Collect unique members
            {$project: {_id: 0, members: 1}} // Keep only the members array
        ]);

        const teamMemberIds = teamUsers.length > 0 ? teamUsers[0].members.concat(_id) : [_id]; // Include leader
        users = await User.find({_id: {$in: teamMemberIds}})

    } else if (role === 'Employee') {
        users = req.user;
    }

    res.status(200).json({
        status: 'success',
        data: {users}
    });
});

// Get team leads (Manager only)

module.exports.updateUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const data = mongoSanitize(req.body);

    console.log('data:', data)
    updatedUser = await User.findOneAndUpdate({_id: id}, data, {new: true})
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});
