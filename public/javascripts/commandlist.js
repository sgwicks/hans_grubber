const connection = require('../../db/connection');

const commandList = () => {
  return connection('commands')
    .select('command_name')
    .then((commands) => {
      return commands.map(({ command_name }) => command_name);
    })
    .catch((err) => console.log(err));
};
module.exports = { commandList };
