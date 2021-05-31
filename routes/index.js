var express = require('express');
var router = express.Router();
const { commandList, quoteList } = require('../public/javascripts/commandlist');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const commands = await commandList()
  const quotes = await quoteList()
  
  res.render('index', {
    title: 'Command List',
    commandList: commands,
    quoteList: quotes
  });
});

module.exports = router;
