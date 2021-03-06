
const {
  selectCommand,
  insertCommand,
  updateCommand,
  delCommand,
  selectCommandInfo,
} = require('../models/commands');
const {shoutout} = require('../api/api')

exports.callCommand = async (msg) => {
  const command_text = await selectCommand(msg);

  return command_text;
};

exports.addCommand = (msg, user) => {
  return insertCommand(msg, user);
};

exports.editCommand = (msg, user) => {
  return updateCommand(msg, user);
};

exports.deleteCommand = (msg, user) => {
  return delCommand(msg, user);
};

exports.commandInfo = async (msg) => {
  const { command_uses, command_name } = await selectCommandInfo(msg);

  if (command_uses === undefined)
    return `Command info failed: command !${command_name} does not exist`;

  return `Command !${command_name} has been used ${command_uses} times`;
};

exports.commandList = () => {
  return 'http://18.133.242.218:3000';
};