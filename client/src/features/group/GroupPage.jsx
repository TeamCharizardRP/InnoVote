import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setUsername,
  clearCreds,
  setError,
  clearError,
  setToken,
  clearToken,
} from '../auth/authSlice.js';

const GroupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const [password, setPassword] = useState(''); // best practice would be to hash
  const error = useSelector((state) => state.auth.error);

  const handleSignup = async (e) => {
    e.preventDefault();
    setPassword('');
    dispatch(clearError());
    try {
      navigate('/login');
    } catch (err) {
      dispatch(setError('Error logging in'));
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSignup}>
        {error && <div className='error-message'>{error}</div>}{' '}
        <div className='input-field'>
          <label htmlFor='username'>Join Group</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
            required
          />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Create Group</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='action-buttons'>
          <button type='submit'>Sign up</button>
          <Link to='/login'>Already have an account? Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default GroupPage;
