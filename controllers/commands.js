const {
  selectCommand,
  insertCommand,
  updateCommand,
  delCommand,
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
