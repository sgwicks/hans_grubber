const env = process.env.NODE_ENV || 'dev';

const { test } = require('./test_data');
const { dev } = require('./dev_data');

const data = { test, dev };

module.exports = data[env];
