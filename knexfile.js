const { user, password } = require('./user');

module.exports = {
  client: 'pg',
  connection: {
    database: 'shanodin',
    user,
    password,
  },
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};
