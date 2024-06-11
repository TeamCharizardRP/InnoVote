require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const teamRouter = require('./routes/teamRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../client/src')));

// Auth Routes
app.use('/auth', authRouter);

// Team Routes
app.use('/team', teamRouter);

// 404 hanlder
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  // defaultErr object
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  res.locals.message = errorObj.message;
  console.log(errorObj.log);
  return res.status(errorObj.status).json(res.locals.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
