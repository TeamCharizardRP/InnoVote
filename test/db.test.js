describe('database', () => {
  let database;

  beforeEach(() => {
    // Initialize the database before each test
    database = {};
  });

  test('is created empty', () => {
    expect(database).toBeDefined(); // Check that the database is defined
    expect(database).toEqual({});   // Check that the database is an empty object
  });
});

describe('user', () => {
  let user;

  beforeEach(() => {
    // Define user properties
    user = {
      user_id: 'some_id',
      user_name: 'some_name',
      password: 'some_password'
    };
  });

  test('has the correct properties', () => {
    expect(typeof user.user_id).toEqual('string');
    expect(typeof user.user_name).toEqual('string');
    expect(typeof user.password).toEqual('string');
  });
});

describe('groups', () => {
  let group;

  beforeEach(() => {
    group = {
      group_id: Infinity,
      group_name: 'some_name',
      group_code: 'some_code',
      num_members: Infinity
    };
  });

  test('has the correct properties', () => {
    expect(typeof group.group_id).toEqual('number');
    expect(typeof group.group_name).toEqual('string');
    expect(typeof group.group_code).toEqual('string');
    expect(typeof group.num_members).toEqual('number');
  });
});

describe('post', () => {
  let post;

  beforeEach(() => {
    post = {
      post_id: Infinity,
      title: 'some_title',
      body: 'some_body',
      author_id: Infinity, // You can change this to 'some_author_id' if it's a string
      timestamp: Infinity,
      votes: Infinity,
      thread: 'some_thread'
    };
  });

  test('has the correct properties', () => {
    expect(typeof post.post_id).toEqual('number');
    expect(typeof post.title).toEqual('string');
    expect(typeof post.body).toEqual('string');
    expect(typeof post.author_id).toEqual('number'); // Change this to 'string' if needed
    expect(typeof post.timestamp).toEqual('number');
    expect(typeof post.votes).toEqual('number');
    expect(typeof post.thread).toEqual('string');
  });
});

describe('user groups', () => {
  let userGroup;

  beforeEach(() => {
    userGroup = {
      user_group_id: Infinity,
      user_id: Infinity,
      group_id: Infinity
    }
  });

  test('has the correct properties', () => {
    expect(typeof userGroup.user_group_id.toEqual('number'));
    expect(typeof userGroup.user_id.toEqual('number'));
    expect(typeof userGroup.group_id.toEqual('number'));
  });
});