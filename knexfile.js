const env = process.env.NODE_ENV || 'dev';
const { user, password } = require('./user');

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const envConfig = {
  test: {
    connection: {
      database: 'shanodin_test',
      user,
      password,
    },
  },
  dev: {
    connection: {
      database: 'shanodin',
      user,
      password,
    },
  },
};

module.exports = { ...baseConfig, ...envConfig[env] };
