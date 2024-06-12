import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, clearCreds, setError, clearError, setToken, clearToken } from './authSlice';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const [password, setPassword] = useState(''); // best practice would be to hash
  const error = useSelector((state) => state.auth.error);

  // Handler for submitting
  const handleSignup = async (e) => {
    e.preventDefault();
    setPassword('');
    dispatch(setError(''));
    try {
      const response = await fetch(`http://localhost:3000/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      dispatch(clearCreds());

      if (response.ok && data) {
        navigate('/login');
      } else {
        dispatch(setError('Username already exists'));
      }
    } catch (err) {
      dispatch(setError('Error signing up'));
    }
  };

  return (
    <div className='sign-up'>
      <form onSubmit={handleSignup}>
        {/* apparently ref can't be a string so it'll error out in cases where error is a string */}
        {/* <div ref={error} className='error-message'></div>{' '} */}
        {error && <div className='error-message'>{error}</div>}{' '}
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
          <button type='submit'>Sign up</button>
          <Link to='/login'>Already have an account? Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
