const connection = require('../db/connection');
const { errorLogging } = require('../errors/errors');

exports.selectQuote = async (msg) => {
  const request = msg.split(' ').splice(1).join(' ');
  const id = request
    ? Number.isInteger(Number(request))
      ? Number(request)
      : null
    : null;

  try {
    const quote = await connection('quotes')
      .select(['quote_text', 'quote_game'])
      .then((res) => {
        const index = id ? id : Math.ceil(Math.random() * res.length);
        const { quote_game, quote_text } = res[index - 1];
        if (quote_game) return `${quote_text} (${quote_game})`;
        else return `${quote_text}`;
      });

    return quote;
  } catch (err) {
    return errorLogging(err);
  }
};
