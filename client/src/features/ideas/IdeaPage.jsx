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

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    try {
      navigate(`/${group}`);
    } catch (err) {
      dispatch(setError('Error logging in'));
    }
  };

  return (
    <div className='login'>
      <h1 className='title'>{`Idea Page placeholder`}</h1>
    </div>
  );
};

export default IdeaPage;
