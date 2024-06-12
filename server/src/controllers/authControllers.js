import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../config/db.js';

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined');
}

const authControllers = {};

authControllers.signup = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(password);
  try {
    // Check if the username already exists
    const existingUser = await db.query('SELECT * FROM users WHERE user_name = $1', [username]);
    if (existingUser.length > 0) {
      return next({
        log: 'Error in authControllers.signup: Username already exists',
        status: 400,
        message: 'Username already exists. Please choose a different username.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (user_name, password) VALUES ($1, $2)', [
      username,
      hashedPassword,
    ]);
    return next();
  } catch (error) {
    return next({
      log: `Error in authController.signup: ${error}`,
      status: 500,
      message: 'Error creating new user',
    });
  }
};

authControllers.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE user_name = $1', [username]);
    if (result.length === 0) {
      return next({
        log: 'Error in authControllers.login: User not found',
        status: 400,
        message: 'Invalid username or password',
      });
    }
    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next({
        log: 'Error in authControllers.login: Incorrect password',
        status: 400,
        message: 'Invalid username or password',
      });
    }

    const token = jwt.sign({ userId: user.user_id }, jwtSecret, { expiresIn: '1h' });
    res.locals.auth = { token, userId: user.user_id };
    return next();
  } catch (error) {
    return next({
      log: `Error in authControllers.login: ${error}`,
      status: 500,
      message: 'Error logging in user',
    });
  }
};

export default authControllers;
