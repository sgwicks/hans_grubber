const {
  selectCommand,
  insertCommand,
  updateCommand,
  delCommand,
  selectCommandInfo,
} = require('../models/commands');

exports.callCommand = async msg => {
  const command_text = await selectCommand(msg);

  return command_text;
};

exports.addCommand = msg => {
  return insertCommand(msg);
};

exports.editCommand = msg => {
  return updateCommand(msg);
};

exports.deleteCommand = msg => {
  return delCommand(msg);
};

exports.commandInfo = async msg => {
  const { command_uses, command_name } = await selectCommandInfo(msg);

  if (command_uses === undefined)
    return `Command info failed: command !${command_name} does not exist`;

  return `Command !${command_name} has been used ${command_uses} times`;
};

exports.commandList = () => {
  return 'List of commands: http://18.130.224.118:8080/commandlist';
};
