const { user, password } = require('./user');

module.exports = {
  client: 'postgresql',
  connection: {
    database: 'shanodin',
    user,
    password,
  },
  migrations: 'db/migrations',
};
