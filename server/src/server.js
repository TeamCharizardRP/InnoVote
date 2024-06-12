import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import ensureAuthenticated from './utils/auth.js';
import authRouter from './routes/authRouter.js';
import groupRouter from './routes/groupRouter.js';
import ideaRouter from './routes/ideaRouter.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client/src')));

// Auth Routes
app.use('/auth', authRouter);

// Group Routes
app.use('/group', ensureAuthenticated, groupRouter);

// Idea Posts Routes
app.use('/idea', ensureAuthenticated, ideaRouter);

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

export default app;
