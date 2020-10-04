const connection = require('../db/connection');
const { errorLogging } = require('../errors/errors');

exports.selectQuote = async (msg) => {
  const request = msg.split(' ').splice(1).join(' ');
  const id = request
    ? Number.isInteger(Number(request))
      ? Number(request)
      : null
    : null;

  const string = request ? (id ? null : request) : null;
  try {
    const quote = await connection('quotes')
      .select(['quote_text', 'quote_game'])
      .then((res) => {
        if (string) {
          const filteredRes = res.filter(({ quote_text }) =>
            quote_text.toLowerCase().includes(string.toLowerCase())
          );
          return filteredRes;
        }

        return res;
      })
      .then(async (res) => {
        if (!res.length)
          return `Quote matching string "${string}" does not exist`;
        if (id > res.length) return `Quote number ${id} does not exist`;

        const index = id ? id : Math.ceil(Math.random() * res.length);

        const { quote_game, quote_text } = res[index - 1];

        await connection('quotes')
          .increment('quote_uses', 1)
          .where({ quote_text });

        if (quote_game) return `${quote_text} (${quote_game})`;

        return `${quote_text}`;
      });

    return quote;
  } catch (err) {
    return errorLogging(err);
  }
};
