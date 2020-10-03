const { selectQuote } = require('../models/quotes');

exports.callQuote = async (msg) => {
  const quote = await selectQuote(msg);
  return quote;
};
