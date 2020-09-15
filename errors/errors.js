const connection = require('../db/connection');

exports.errorLogging = async err => {
  const { code, detail } = err;

  await connection('errors').insert({
    error_code: code,
    error_details: detail,
  });

  return `Error: check logs (code ${code})`;
};

/*
 code
 detail
 */
