const connection = require('../db/connection');
const { errorLogging } = require('../errors/errors');
const permittedUsers = require('../user-ids');

const permittedUserIds = Object.values(permittedUsers);

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
          const filterForString = res.filter(({ quote_text }) =>
            quote_text.toLowerCase().includes(string.toLowerCase())
          );
          return filterForString;
        }
        return res;
      })
      .then(async (res) => {
        if (!res.length)
          return `Quote matching string "${string}" does not exist`;

        if (id) {
          const quote_id = id;

          const filterForId = res.filter(({ id }) => id === quote_id);

          if (!filterForId.length) return `Quote number ${id} does not exist`;
        }

        const index = id ? id : Math.ceil(Math.random() * res.length);

        const { quote_game, quote_text } = id
          ? res.filter(({ id }) => {
              return id === index;
            })[0]
          : res[index - 1];

        await connection('quotes')
          .increment('quote_uses', 1)
          .where({ quote_text });

        if (quote_game)
          return `${id || index + 1}. ${quote_text} (${quote_game})`;

        return `${id || index + 1}. ${quote_text}`;
      });

    return quote;
  } catch (err) {
    console.log(err);
    return errorLogging(err);
  }
};

exports.insertQuote = async (msg, user) => {
  const request = msg.split(' ').splice(1).join(' ');

  const quote_text = request.split('!game')[0].trim();
  const quote_game = request.split('!game ')[1];

  try {
    if (!quote_text) return 'Add quote failed: no quote text provided';
    if (!quote_game & request.includes('!game'))
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
  if (!user.mod) {
    if (!permittedUserIds.includes(user['user-id']))
      return 'Edit quote failed: only moderators may use this action';
  }
  const request = msg.split(' ').splice(1);
  const id = Number(request[0]);
  const requestText = request.splice(1).join(' ');
  const quote_text = requestText.split(' !game')[0];
  const quote_game = requestText.split('!game ')[1];

  try {
    // If nothing provided, throw error
    if (!quote_text & !quote_game) throw { code: '00000' };

    if (quote_text.startsWith('!game')) {
      // If quote_game but no quote_text, just update game
      await connection('quotes')
        .update({ quote_game })
        .where({ id })
    } else {
      // Use quote text and quote game
      await connection('quotes')
        .where({ id })
        .update({ quote_text, quote_game })
    }

    const [newQuote] = await connection('quotes').where({ id })
    if (!newQuote) throw { code: '99999' };

    return newQuote.quote_game
      ? `Edited quote ${newQuote.id} -> "${newQuote.quote_text} (${newQuote.quote_game})"`
      : `Edited quote ${newQuote.id} -> "${newQuote.quote_text}"`;
  } catch (err) {
    errorLogging(err);
    const errorMsg = 'Edit quote failed:';

    switch (err.code) {
      case 'ER_BAD_FIELD_ERROR':
        return `${errorMsg} no quote number provided`;
      case '99999':
        return `${errorMsg} quote number ${id} does not exist`;
      case '00000':
        return `${errorMsg} no quote text provided`;
      default:
        return `${errorMsg} something unexpected happened`;
    }
  }
};

exports.delQuote = async (msg, user) => {
  if (!user.mod) {
    if (!permittedUserIds.includes(user['user-id']))
      return 'Delete quote failed: only moderators may use this command';
  }
  const id = Number(msg.split(' ')[1]);

  try {
    const isDeleted = await connection('quotes').where({ id }).del();
    if (!isDeleted) throw { code: '00000' };
    return `Quote ${id} deleted`;
  } catch (err) {
    const errorMsg = 'Delete quote failed:';

    switch (err.code) {
      case 'ER_BAD_FIELD_ERROR':
        return `${errorMsg} no quote number provided`;
      case '00000':
        return `${errorMsg} quote number ${id} does not exist`;
    }
    console.log(err);
  }
};
