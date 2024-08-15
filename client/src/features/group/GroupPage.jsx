import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setError, clearError } from '../auth/authSlice.js';
import { setGroupName, setGroupInfo, setGroupList } from '../group/groupSlice.js';

const GroupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const [password, setPassword] = useState(''); // best practice would be to hash
  const group_name = useSelector((state) => state.group.name);
  const groupList = useSelector((state) => state.group.list);
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    const fetchGroup = async () => {
      const response = await fetch(`/group/listGroups`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json(); // array of obj of ideas
      const sortedList = data.sort((a, b) => a.data.group_id - b.data.group_id);
      dispatch(setGroupList(sortedList));
    };
    fetchGroup();
  }, []);

  // Handler for create a group
  const handleCreate = async (e) => {
    e.preventDefault();
    setPassword('');
    dispatch(setError(''));
    try {
      const response = await fetch(`http://localhost:3000/group/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ group_name }),
      });
      dispatch(setGroupName(''));
      const data = await response.json();

      if (response.ok && data) {
        dispatch(setGroupInfo(data));
      } else {
        dispatch(setError(data));
      }
    } catch (err) {
      dispatch(setError('Error creating group'));
    }
  };

  // Handler for join a group
  const handleJoin = async (e) => {
    e.preventDefault();
    dispatch(setError(''));
    try {
      const response = await fetch(`http://localhost:3000/group/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ group_name }),
      });
      dispatch(setGroupName(''));
      const data = await response.json();

      if (response.ok && data) {
        dispatch(setGroupInfo(data));
        navigate('/ideas');
      } else {
        dispatch(setError(data));
      }
    } catch (err) {
      dispatch(setError('Error creating group'));
    }
  };

  return (
    <div>
      <ul>
        {groupList.map((group) => (
          <li key={group.group_id}>
            <button>{`Name: ${group.group_name} Group ID: ${group.group_id} Members: ${group.num_members}`}</button>
          </li>
        ))}
      </ul>
      <div className='login'>
        <h1 className='title'>{`Hi, ${username}!`}</h1>
        <form onSubmit={handleCreate}>
          {error && <div className='error-message'>{error}</div>}
          <div className='input-field'>
            <label htmlFor='group code'>Create Group</label>
            <input
              type='text'
              id='username'
              value={group_name}
              placeholder='Enter group name'
              onChange={(e) => dispatch(setGroupName(e.target.value))}
              required
            />
          </div>
          <div className='action-buttons'>
            <button type='submit'>Join</button>
          </div>
        </form>
        <form onSubmit={handleJoin}>
          <div className='input-field'>
            <label htmlFor='group name'>Join Group</label>
            <input
              type='text'
              id='username'
              // value={group_name}
              placeholder='Enter group name'
              onChange={(e) => dispatch(setGroupName(e.target.value))}
              required
            />
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
