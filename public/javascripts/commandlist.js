const connection = require('../../db/connection');

const commandList = () => {
  return connection('commands')
    .select('command_name')
    .then((commands) => {
      return commands.map(({ command_name }) => command_name);
    })
    .catch((err) => console.log(err));
};

const quoteList = () => {
  return connection('quotes')
  .select('quote_text', 'quote_game', 'id')
  .then((quotes) => {
    return quotes.map(({ quote_text, quote_game, id }) => {
      if (quote_game) {
        return `${quote_text} (${quote_game})`
      } else {
        return `${quote_text}`
      }
    })
  })
}
module.exports = { commandList, quoteList };
