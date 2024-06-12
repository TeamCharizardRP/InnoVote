import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setError, clearError } from '../auth/authSlice.js';
import { addGroup } from '../group/groupSlice.js';

const GroupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const error = useSelector((state) => state.auth.error);
  const group = useSelector((state) => state.group.groups);

  const handleJoin = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    try {
      navigate(`/idea`);
    } catch (err) {
      dispatch(setError('Error logging in'));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    try {
      navigate(`/idea`);
    } catch (err) {
      dispatch(setError('Error logging in'));
    }
  };

  return (
    <div>
      <div className='login'>
        <h1 className='title'>{`Hi, ${username}!`}</h1>
        <form onSubmit={handleJoin}>
          {error && <div className='error-message'>{error}</div>}
          <div className='input-field'>
            <label htmlFor='group code'>Join Group</label>
            <input type='text' id='username' placeholder='group name' required />
          </div>
          <div className='action-buttons'>
            <button type='submit'>Join</button>
          </div>
        </form>
        <form onSubmit={handleAdd}>
          <div className='input-field'>
            <label htmlFor='group code'>Add Group</label>
            <input type='text' id='username' placeholder='group name' required />
          </div>
          <div className='action-buttons'>
            <button type='submit'>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupPage;
