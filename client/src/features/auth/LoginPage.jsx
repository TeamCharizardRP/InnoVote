import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, clearCreds, setError, clearError, setToken, clearToken } from './authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const error = useSelector((state) => state.auth.error);
  const passwordRef = useRef();

  // Handler for submitting
  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    const password = passwordRef.current.value;

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
        dispatch(setToken(data.token));
        navigate('/login');
      }
    } catch (err) {
      dispatch(setError('Error logging in'));
    }
  };

  const handleChange = (e) => {
    dispatch(setUsername(e.target.value));
    dispatch(clearError());
  };

  return (
    <div className='sign-up'>
      <form onSubmit={handleSignup}>
        <div ref={error} className='error-message'></div>
        <div className='input-field'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' value={username} onChange={handleChange} required />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className='action-buttons'>
          <button type='submit'>Log in</button>
          <Link to='/signup'>Don't have an account? Sign up here</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
