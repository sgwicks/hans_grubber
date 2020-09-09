const { fetchCommand } = require('../models/commands');

exports.callCommand = (target, command_name) => {
  return fetchCommand(command_name)
    .then(res => {
      if (!res.length) return `Commmand !${command_name} does not exist`;
      else return res[0].command_text;
    })
    .catch(err => console.log(err));
};
