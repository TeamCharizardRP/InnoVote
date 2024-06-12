import db from '../../config/db.js';

const ideaControllers = {};

ideaControllers.createIdea = async (req, res, next) => {
  const { group_id } = req.params;
  const { title, body } = req.body;
  const author_id = req.userId; // Using the authenticated user ID
  const timestamp = new Date();
  try {
    const result = await db.query(
      'INSERT INTO posts (title, body, author_id, timestamp, votes, group_id, num_comments) VALUES ($1, $2, $3, $4, 0, $5, 0) RETURNING *',
      [title, body, author_id, timestamp, group_id],
    );
    res.locals.idea = result[0];
    return next();
  } catch (error) {
    return next({
      log: `Error in ideaControllers.createIdea: ${error}`,
      status: 500,
      message: 'Error creating post',
    });
  }
};

ideaControllers.updateIdea = async (req, res, next) => {
  const { post_id } = req.params;
  const { title, body } = req.body;
  try {
    const result = await db.query(
      'UPDATE posts SET title = $1, body = $2 WHERE post_id = $3 RETURNING *',
      [title, body, post_id],
    );
    res.locals.idea = result[0];
    return next();
  } catch (error) {
    return next({
      log: `Error in ideaControllers.updateIdea: ${error}`,
      status: 500,
      message: 'Error updating post',
    });
  }
};

ideaControllers.getIdeaById = async (req, res, next) => {
  const { post_id } = req.params;
  try {
    const result = await db.query('SELECT * FROM posts WHERE post_id = $1', [post_id]);
    res.locals.idea = result[0];
    return next();
  } catch (error) {
    return next({
      log: `Error in ideaControllers.getIdeaById: ${error}`,
      status: 500,
      message: 'Error fetching post',
    });
  }
};

ideaControllers.getAllIdeas = async (req, res, next) => {
  const { group_id } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM posts WHERE group_id = $1 ORDER BY timestamp DESC',
      [group_id],
    );
    res.locals.ideas = result;
    return next();
  } catch (error) {
    return next({
      log: `Error in ideaControllers.getAllIdeas: ${error}`,
      status: 500,
      message: 'Error fetching ideas',
    });
  }
};

ideaControllers.upvoteIdea = async (req, res, next) => {
  const { post_id, group_id } = req.params;
  try {
    // Ensure the idea is availiable
    const idea = await db.query('SELECT * FROM posts WHERE post_id = $1 AND group_id = $2', [
      post_id,
      group_id,
    ]);
    if (idea.length === 0) {
      return next({
        log: 'Error in ideaControllers.upvoteIdea: Post not found in the group',
        status: 404,
        message: 'Idea post not found in the group',
      });
    }

    const result = await db.query(
      'UPDATE posts SET votes = votes + 1 WHERE post_id = $1 RETURNING *',
      [post_id],
    );
    res.locals.idea = result[0];
    return next();
  } catch (error) {
    return next({
      log: `Error in ideaControllers.upvoteIdea: ${error}`,
      status: 500,
      message: 'Error upvoting idea',
    });
  }
};

ideaControllers.deleteIdea = async (req, res, next) => {
  const { post_id } = req.params;
  try {
    await db.query('DELETE FROM posts WHERE post_id = $1', [post_id]);
    return next();
  } catch (error) {
    return next({
      log: `Error in ideaControllers.deleteIdea: ${error}`,
      status: 500,
      message: 'Error deleting idea post',
    });
  }
};

export default ideaControllers;
