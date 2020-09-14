const { fetchCommand, createCommand } = require('../models/commands');

exports.callCommand = async msg => {
  const command_text = await fetchCommand(msg);

  return command_text;
};

exports.addCommand = async msg => {
  return createCommand(msg);
};
