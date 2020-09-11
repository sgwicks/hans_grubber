const connection = require('../db/connection');

exports.fetchCommand = async msg => {
  const command_name = msg.split(' ')[0].slice(1);
  const command_text = await connection('commands')
    .select('command_text')
    .where({ command_name })
    .then(res => {
      if (!res.length) return `Command !${command_name} does not exist`;
      else return res[0].command_text;
    });

  return command_text;
};

exports.createCommand = msg => {
  const msgArray = msg.split(' ');

  const command_name = msgArray[1];
  const command_text = msgArray.splice(0, 2).join(' ');

  return connection('commands');
};

// !addcommand morning morning folks
