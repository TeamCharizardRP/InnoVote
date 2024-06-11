const express = require('express');
const authControllers = require('../controllers/authControllers');

const authRouter = express.Router();

authRouter.post('/signup', authControllers.signup, (req, res) => {
  res.status(201).json({ message: 'User created successfully' });
});

authRouter.post('/login', authControllers.login, (req, res) => {
  const { token, userId } = res.locals.auth;
  res.status(200).json({ token, userId });
});

module.exports = authRouter;
