import db from '../../config/db.js';

const groupControllers = {};

groupControllers.createGroup = async (req, res, next) => {
  const { group_name } = req.body;
  const user_id = req.userId; // Using the authenticated user ID
  try {
    // Check if the group name already exists
    const existingGroup = await db.query('SELECT * FROM groups WHERE group_name = $1', [
      group_name,
    ]);
    if (existingGroup.length > 0) {
      return next({
        log: 'Error in groupControllers.createGroup: Group name already exists',
        status: 400,
        message: 'Group name already exists. Please choose a different name.',
      });
    }

    // Insert the new group into the database
    const newGroup = await db.query(
      'INSERT INTO groups (group_name, num_members) VALUES ($1, $2) RETURNING *',
      [group_name, 1],
    );

    const group_id = newGroup.group_id;
    // Add the user to the newly created group
    await db.query('INSERT INTO users_groups (user_id, group_id) VALUES ($1, $2)', [
      user_id,
      group_id,
    ]);

    res.locals.newGroup = newGroup[0];
    return next();
  } catch (error) {
    return next({
      log: `Error in groupControllers.createGroup: ${error}`,
      status: 500,
      message: 'Error creating new group',
    });
  }
};

groupControllers.joinGroup = async (req, res, next) => {
  const { group_name } = req.body;
  const user_id = req.userId; // Using the authenticated user ID
  try {
    // Check if the group exist
    const group = await db.query('SELECT * FROM groups WHERE group_name = $1', [group_name]);
    if (group.length === 0) {
      return next({
        log: 'Error in groupControllers.joinGroup: Group not found',
        status: 404,
        message: 'Group not found',
      });
    }
    // Use group_id for table updates
    const group_id = group[0].group_id;
    const userGroup = await db.query(
      'SELECT * FROM users_groups WHERE user_id = $1 AND group_id = $2',
      [user_id, group_id],
    );
    if (userGroup.length > 0) {
      return next({
        log: 'Error in groupControllers.joinGroup: User already in the group',
        status: 400,
        message: 'User already in the group',
      });
    }

    await db.query('INSERT INTO users_groups (user_id, group_id) VALUES ($1, $2)', [
      user_id,
      group_id,
    ]);
    await db.query('UPDATE groups SET num_members = num_members + 1 WHERE group_id = $1', [
      group_id,
    ]);

    return next();
  } catch (error) {
    return next({
      log: `Error in groupControllers.joinGroup: ${error}`,
      status: 500,
      message: 'Error joining the group',
    });
  }
};

export default groupControllers;
