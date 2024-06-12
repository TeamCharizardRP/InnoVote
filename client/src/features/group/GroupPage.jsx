import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const GroupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.rootReducer.username);
  const password = useSelector((state) => state.rootReducer.password);
  const error = useSelector((state) => state.rootReducer.error);

  // Handler for submitting
  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ajson',
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
          <button type='submit'>Log in</button>
          <Link to='/signup'>Don't have an account? Sign up here</Link>
        </div>
      </form>
    </div>
  );
};

export default GroupPage;
