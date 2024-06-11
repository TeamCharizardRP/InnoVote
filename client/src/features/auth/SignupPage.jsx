import React, { useRef, useState } from 'react';
import { useNavigate, useSelector } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.rootReducer.username);
  const password = useSelector((state) => state.rootReducer.password);
  const error = useSelector((state) => state.rootReducer.error);

  // Handler for submitting
  const handleSignup = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

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
        if (errorRef.current) {
          errorRef.current.textContent = 'Username already exists';
        }
      }
    } catch (err) {
      if (errorRef.current) {
        errorRef.current.textContent = 'Invalid username or password';
      }
    }
  };

  return (
    <div className='sign-up'>
      <form onSubmit={handleSignup}>
        <div ref={errorRef} className='error-message'></div>
        <div className='input-field'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' ref={usernameRef} required />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className='action-buttons'>
          <button type='submit'>Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
