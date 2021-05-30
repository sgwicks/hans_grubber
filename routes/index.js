var express = require('express');
var router = express.Router();
const { commandList, quoteList } = require('../public/javascripts/commandlist');

/* GET home page. */
router.get('/', (req, res, next) => {
  Promise.all(commandList, quoteList)
  .then(([commands, quotes]) => {
    res.render('index', {
      title: 'Command List',
      commandList: commands,
      quoteList: quotes
    });
  });
});

module.exports = router;
