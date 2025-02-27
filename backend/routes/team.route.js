const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teams.controller');
const {authorizeRole} = require("../middlewares/verifyRole");

router.get('/', authorizeRole(['Manager']), teamController.getTeams);
router.post('/', authorizeRole(['Manager']), teamController.createTeam);
router.get('/:id', authorizeRole(['Team Lead']), teamController.getTeamById);
router.get('/my-team', authorizeRole(['Team Lead']), teamController.getUserTeam);


module.exports = router;