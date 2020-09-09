const connection = require('../db/connection');

exports.fetchCommand = msg => {
  const command_name = msg.split(' ')[0].slice(1);

  return connection('commands')
    .select('command_text')
    .where({ command_name })
    .then(res => {
      if (!res.length) return `Commmand !${command_name} does not exist`;
      else return res[0].command_text;
    });
};
