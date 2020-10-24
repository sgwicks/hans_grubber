var express = require('express');
var router = express.Router();
const { commandList } = require('../public/javascripts/commandlist');

/* GET home page. */
router.get('/', (req, res, next) => {
  commandList().then((commands) => {
    res.render('index', {
      title: 'Command List',
      commandList: commands,
    });
  });
});

module.exports = router;
