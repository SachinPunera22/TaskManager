// MongoDB models (based on the schema previously defined)
const User = require('../models/user.model');
const Team = require('../models/team.model');
const asyncHandler = require("../middlewares/asyncHandler");

// ============= TEAM ROUTES =============

// Create a team (Manager only)
exports.createTeam = asyncHandler(async (req,res,next) =>{
    const {name, description, teamLeader, employees} = req.body;

    // Verify teamLead is a Team Lead
    const teamLeadUser = await User.findById(teamLeader);
    console.log('employees:',employees
    )
    if (!teamLeadUser || teamLeadUser.role !== 'Team Lead') {
        return res.status(400).json({message: 'Invalid team lead'});
    }

    const team = new Team({
        name,
        description,
        teamLead:teamLeader,
        members: employees || []
    });

    await team.save();

    res.status(200).json({
        status: 'success',
        data: {
            team
        }
    });

})



// Get all teams (Manager only)
exports.getTeams = asyncHandler(async (req,res,next) =>{
    const teams = await Team.find()
        .populate('teamLead', 'username firstName lastName')
        .populate('members', 'username firstName lastName');
    res.status(200).json({
        status: 'success',
        data: {
            teams
        }
    });

})

// Get team by ID (Manager or Team Lead of that team)
exports.getTeamById = asyncHandler(async (req,res,next) =>{
    const team = await Team.findById(req.params.id)
        .populate('teamLead', 'username firstName lastName')
        .populate('members', 'username firstName lastName');

    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }

    // Check if user is authorized to view this team
    if (req.user.role === 'Team Lead' && team.teamLead._id.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'Unauthorized to view this team' });
    }

    if (req.user.role === 'Employee') {
        return res.status(403).json({ message: 'Unauthorized to view team details' });
    }
    res.status(200).json({
        status: 'success',
        data: {
            team
        }
    });

})

// Get team by ID (Manager or Team Lead of that team)
exports.getUserTeam = asyncHandler(async (req,res,next) =>{
    let team;

    if (req.user.role === 'Team Lead') {
      team = await Team.findOne({ teamLead: req.user.userId })
        .populate('members', 'username firstName lastName');
    } else if (req.user.role === 'Employee') {
      team = await Team.findOne({ members: req.user.userId })
        .populate('teamLead', 'username firstName lastName');
    }

    if (!team) {
      return res.status(404).json({ message: 'No team found' });
    }

    res.status(200).json({
        status: 'success',
        data: {
            team
        }
    });

})

