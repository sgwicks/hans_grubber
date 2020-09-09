const { fetchCommand } = require('../models/commands');

exports.callCommand = msg => {
  return fetchCommand(msg)
    .then(command_text => command_text)
    .catch(err => console.log(err));
};
