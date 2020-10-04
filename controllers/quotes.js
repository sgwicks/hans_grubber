const { selectQuote, insertQuote } = require('../models/quotes');

exports.callQuote = async (msg) => {
  const quote = await selectQuote(msg);
  return quote;
};

exports.addQuote = (msg) => {
  return insertQuote(msg);
};
