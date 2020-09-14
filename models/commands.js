const connection = require('../db/connection');

exports.fetchCommand = async msg => {
  const command_name = msg.split(' ')[0].slice(1);
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
};

const incrementCommand = command_name => {
  return connection('commands')
    .where({ command_name })
    .increment({ command_uses: 1 });
};

exports.createCommand = msg => {
  const msgArray = msg.split(' ');

  const command_name = msgArray[1];
  const command_text = msgArray.splice(2).join(' ');

  return connection('commands').insert({ command_name, command_text });
};

// !addcommand morning morning folks
