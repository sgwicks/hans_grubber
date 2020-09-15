const connection = require('../db/connection');
const { errorLogging } = require('../errors/errors');

const splitCommand = msg => {
  const msgArray = msg.split(' ');

  const command_name = msgArray[1];
  const command_text = msgArray.splice(2).join(' ');

  return { command_name, command_text };
};

const incrementCommand = command_name => {
  return connection('commands')
    .where({ command_name })
    .increment({ command_uses: 1 });
};

exports.selectCommand = async msg => {
  const command_name = msg.split(' ')[0].slice(1);

  try {
    const command_text = await connection('commands')
      .select('command_text')
      .where({ command_name })
      .then(async res => {
        if (!res.length) return `Command !${command_name} does not exist`;
        else {
          await incrementCommand(command_name);
          return res[0].command_text;
        }
      });

    return command_text;
  } catch (err) {
    return errorLogging(err);
  }
};

exports.insertCommand = async msg => {
  const { command_name, command_text } = splitCommand(msg);

  if (!command_name) return 'Add command failed: no command name provided';
  if (!command_text) return 'Add command failed: no command text provided';

  try {
    await connection('commands').insert({ command_name, command_text });
    return `Added command !${command_name} -> "${command_text}"`;
  } catch (err) {
    switch (err.code) {
      case '23505':
        return `Add command failed: command !${command_name} already exists`;
      default:
        return errorLogging(err);
    }
  }
};

exports.updateCommand = async msg => {
  const { command_name, command_text } = splitCommand(msg);

  if (!command_name) return 'Edit command failed: no command name provided';
  if (!command_text) return `Edit command failed: no command text provided`;

  try {
    // ['command_text] returns updated text
    const exists = await connection('commands')
      .where({ command_name })
      .update({ command_text }, ['command_text']);

    if (!exists.length)
      return `Edit command failed: command !${command_name} does not exist`;

    return `Updated command !${command_name} -> "${command_text}"`;
  } catch (err) {
    return errorLogging(err);
  }

  return;
};

exports.delCommand = async msg => {
  const { command_name } = splitCommand(msg);

  if (!command_name) return `Delete command failed: no command name provided`;

  try {
    const commandExists = await connection('commands')
      .select()
      .where({ command_name });

    if (!commandExists.length)
      return `Delete command failed: command !${command_name} does not exist`;

    await connection('commands').where({ command_name }).del();

    return `Deleted command !${command_name}`;
  } catch (err) {
    return errorLogging(err);
  }

  return 'Delete command';
};

exports.selectCommandInfo = async msg => {
  const { command_name } = splitCommand(msg);

  try {
    const command_info = await connection('commands')
      .first()
      .where({ command_name });

    if (!command_info) return { command_name };

    return command_info;
  } catch (err) {
    return errorLogging(err);
  }
};
