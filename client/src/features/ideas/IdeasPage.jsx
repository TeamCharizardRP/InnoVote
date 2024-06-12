import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIdeasList } from './ideasSlice';

const IdeasPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const ideasList = useSelector((state) => state.ideas.ideasList);
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);
  // const groupId = useSelector((state) => state.groups.groupId);

  // useEffect(async () => {
  //   fetchIdeas(groupId); // get groupId from state
  // }, []);

  // test data
  const idea = {
    post_id: 1,
    num_votes: 10,
    title: 'big title',
    description: 'very descriptive',
    num_comments: 0,
  };
  const idea2 = {
    post_id: 2,
    num_votes: 10,
    title: 'big title',
    description: 'very descriptive',
    num_comments: 0,
  };
  const ideasList = [idea, idea2];

  return (
    <div id='ideas-list'>
      <table id='ideas-table'>
        {ideasList.map((idea) => (
          <tbody key={idea.post_id} className='idea-container'>
            <tr id={idea.post_id} className='ideas'>
              <td className='idea-votes'>{idea.num_votes}</td>
              <td className='idea-title-description'>
                <div className='idea-title'>{idea.title}</div>
                <div className='idea-description'>{idea.description}</div>
              </td>
              <td className='idea-comments'>{idea.num_comments}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

// const fetchIdeas = async (groupId) => {
//   const dispatch = useDispatch();
//   try {
//     const response = await fetch(`/ideas/:${groupId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await response.json(); // array of obj of ideas
//     const sortedList = data.sort((a, b) => a.num_votes - b.num_votes);
//     dispatch(setIdeasList(sortedList));
//   } catch (err) {
//     dispatch(setError('Error getting list of posts'));
//   }
// };

export default IdeasPage;
