const { selectQuote, insertQuote, updateQuote } = require('../models/quotes');

exports.callQuote = async (msg) => {
  const quote = await selectQuote(msg);
  return quote;
};

exports.addQuote = (msg, user) => {
  return insertQuote(msg, user);
};

exports.editQuote = (msg, user) => {
  return updateQuote(msg, user);
};
