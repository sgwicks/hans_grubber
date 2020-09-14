const {
  selectCommand,
  insertCommand,
  updateCommand,
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
