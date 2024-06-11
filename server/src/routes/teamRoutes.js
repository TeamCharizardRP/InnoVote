const express = require('express');
const ensureAuthenticated = require('../utils/auth');
const teamControllers = require('../controllers/teamController');

const teamRouter = express.Router();
// Apply auth to the beginning of each route
teamRouter.use(ensureAuthenticated);

// Create a team
teamRouter.post('/create', teamControllers.createTeam);

// Join a team
teamRouter.post('/join', teamControllers.joinTeam);

module.exports = teamRouter;
