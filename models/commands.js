const connection = require('../db/connection');

exports.fetchCommand = command_name => {
  return connection('commands')
    .select('command_text')
    .where({ command_name })
    .then(res => res);
};
