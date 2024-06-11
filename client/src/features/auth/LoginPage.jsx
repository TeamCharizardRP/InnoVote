import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCreds, setError } from './authSlice.js';
// import { setIsAuthenticated } from './appSlice.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.rootReducer.signupusername);
  const password = useSelector((state) => state.rootReducer.signuppassword);

  // Handler for submitting
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setError(''));

    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }); // check with the backend

      const data = await response.json();

      if (response.ok && data) {
        dispatch(setIsAuthenticated(true));
        dispatch(setUser(data));
        navigate('/home');
      } else {
        dispatch(setError('Incorrect username or password'));
      }
    } catch (err) {
      dispatch(setError('Error logging in'));
    }
  };

  // Handler for user input fetching
  const handleUsernameChange = (e) => {
    dispatch(setUsername(e.target.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  return (
    <div className='login'>
      {/* <Header />w */}
      <form
        onSubmit={async (e) => {
          handleLogin(e);
        }}
      >
        {error && <div className='error-message'>{error}</div>}
        <div className='input-field'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' value={username} onChange={handleUsernameChange} />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' value={password} onChange={handlePasswordChange} />
        </div>
        <div className='action-buttons'>
          <button type='submit'>Login</button>
          <Link to='/signup'>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
