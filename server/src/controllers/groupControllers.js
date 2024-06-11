const db = require('../../config/db');

const groupControllers = {};

groupControllers.createGroup = async (req, res, next) => {
  const { group_name } = req.body;
  try {
    // Check if the group name already exists
    const existingGroup = await db.query('SELECT * FROM Groups WHERE group_name = $1', [
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
      'INSERT INTO Groups (group_name, num_members) VALUES ($1, $2) RETURNING *',
      [group_name, 1],
    );

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

module.exports = groupControllers;
