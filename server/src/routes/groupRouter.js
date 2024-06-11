const express = require('express');
const groupControllers = require('../controllers/groupControllers');

const groupRouter = express.Router();

// Create a group
groupRouter.post('/create', groupControllers.createGroup, (req, res) => {
  res.status(201).json(res.locals.newGroup);
});

// Join a group
groupRouter.post('/join', groupControllers.joinGroup, (req, res) => {
  res.status(200).json({ message: 'Joined group successfully' });
});

module.exports = groupRouter;