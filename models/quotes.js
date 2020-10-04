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
      .select(['quote_text', 'quote_game', 'id'])
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

        const { quote_game, quote_text } = id
          ? res.filter(({ id }) => {
              return id === index;
            })[0]
          : res[index - 1];

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

exports.insertQuote = async (msg, user) => {
  if (!user.mod & (user['user-id'] !== '42340677'))
    return 'Add quote failed: only moderators can add quotes';
  const request = msg.split(' ').splice(1).join(' ');

  const quote_text = request.split('!game')[0].trim();
  const quote_game = request.split('!game ')[1];

  try {
    if (!quote_text) return 'Add quote failed: no quote text provided';
    if (!quote_game && request.includes('!game'))
      return 'Add quote failed: called !game with no game';
    await connection('quotes').insert({ quote_text, quote_game });

    return quote_game
      ? `Quote added: "${quote_text} (${quote_game})"`
      : `Quote added: "${quote_text}"`;
  } catch (err) {
    console.log(err);
    return errorLogging(err);
  }
};

exports.updateQuote = async (msg, user) => {
  const request = msg.split(' ').splice(1);
  const id = Number(request[0]);
  const requestText = request.splice(1).join(' ');
  const quote_text = requestText.split(' !game')[0];
  const quote_game = requestText.split('!game ')[1];

  return connection('quotes').update({ quote_text, quote_game }).where({ id });
};
