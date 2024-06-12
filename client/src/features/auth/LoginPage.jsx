import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setUserId, setError, clearError, setToken } from './authSlice.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const [password, setPassword] = useState(''); // best practice would be to hash
  const error = useSelector((state) => state.auth.error);

  // Handler for submitting
  const handleSignup = async (e) => {
    e.preventDefault();
    setPassword('');
    dispatch(clearError());
    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data) {
        dispatch(setUserId(data.userId));
        dispatch(setToken(data.token));

        navigate('/group');
      } else {
        dispatch(setError(data));
      }
    } catch (err) {
      dispatch(setError('Error logging in'));
    }
  };

  return (
    <div className='login'>
      <h1 className='title'>InnoVote</h1>
      <h3 className='title'>Log in with your username and password</h3>
      <h3 className='title'>Log in</h3>
      <form onSubmit={handleSignup}>
        {error && <div className='error-message'>{error}</div>}
        <div className='input-field'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
            required
          />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='action-buttons'>
          <button type='submit'>Log in</button>
          <div className='signup-text'>
            <span>Need an account? </span>
            <Link to='/signup'>Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
