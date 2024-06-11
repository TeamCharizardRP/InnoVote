import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const SignupPage = () => {
  const navigate = useNavigate();
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

      if (response.ok && data) {
        navigate('/login');
      } else {
        dispatch(setError('Username already exists'));
      }
    } catch (err) {
      dispatch(setError('Error logging in'));
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
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
