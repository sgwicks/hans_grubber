const connection = require('./db/connection');

const app = require('express')();
const port = 8080;

app.get('/', (req, res) => {
  return res.status(200).send({ '/commandlist': 'Lists all commands' });
});

app.get('/commandlist', async (req, res) => {
  const commandlist = await connection('commands').select('*');

  return res.status(200).send({ commandlist });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
