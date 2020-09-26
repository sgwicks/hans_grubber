const { selectQuote } = require('../models/quotes');

exports.callQuote = (msg) => {
  return selectQuote(msg);
};
