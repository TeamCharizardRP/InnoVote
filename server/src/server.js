const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../client/src')));

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
