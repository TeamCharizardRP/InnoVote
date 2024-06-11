const express = require('express');
const ensureAuthenticated = require('../utils/auth');
const groupControllers = require('../controllers/groupControllers');

const groupRouter = express.Router();
// Apply auth to the beginning of each route
groupRouter.use(ensureAuthenticated);

// Create a group
groupRouter.post('/create', groupControllers.creategroup);

// Join a group
groupRouter.post('/join', groupControllers.joingroup);

module.exports = groupRouter;
