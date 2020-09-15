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
  const { command_uses } = await selectCommandInfo(msg);

  return command_uses;
};
