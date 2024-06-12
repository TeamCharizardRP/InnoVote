import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setError, clearError } from '../auth/authSlice.js';
import { addGroup } from '../group/groupSlice.js';

const GroupList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const error = useSelector((state) => state.auth.error);

  const handleJoin = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    try {
      navigate(`/idea`);
    } catch (err) {
      dispatch(setError('Error error joining group'));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    try {
      navigate(`/idea`);
    } catch (err) {
      dispatch(setError('Error adding group'));
    }
  };

  return (
    <div>
      <h1>
        
      </h1>
    </div>
  );
};

export default GroupList;
