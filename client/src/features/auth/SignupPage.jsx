import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCreds, clearCreds, setError, clearError, setToken, clearToken } from './authSlice';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.rootReducer.username);
  const password = useSelector((state) => state.rootReducer.password);
  const error = useSelector((state) => state.rootReducer.error);

  // Handler for submitting
  const handleSignup = async (e) => {
    e.preventDefault();
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
        <div ref={error} className='error-message'></div>
        <div className='input-field'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' ref={username} required />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' ref={password} required />
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
