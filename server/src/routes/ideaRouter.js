import express from 'express';
import ideaControllers from '../controllers/ideaControllers.js';

const ideaRouter = express.Router();

ideaRouter.post('/:group_id', ideaControllers.createIdea, (req, res) => {
  res.status(201).json(res.locals.idea);
});

ideaRouter.put('/:post_id', ideaControllers.updateIdea, (req, res) => {
  res.status(200).json(res.locals.idea);
});

ideaRouter.get('/:post_id', ideaControllers.getIdeaById, (req, res) => {
  res.status(200).json(res.locals.idea);
});

ideaRouter.get('/group/:group_id', ideaControllers.getAllIdeas, (req, res) => {
  res.status(200).json(res.locals.ideas);
});

// Use patch request for updating a piece of an entry
ideaRouter.patch('/:group_id/:post_id/upvote', ideaControllers.upvoteIdea, (req, res) => {
  res.status(200).json(res.locals.idea);
});

ideaRouter.delete('/:post_id', ideaControllers.deleteIdea, (req, res) => {
  res.status(200).json({ message: 'Post deleted successfully!' });
});

export default ideaRouter;
