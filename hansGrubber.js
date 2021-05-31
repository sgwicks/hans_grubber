const tmi = require('tmi.js');
const { shoutout } = require('./api/api');
const { addChallenge } = require('./controllers/global')
const {
  callCommand,
  addCommand,
  editCommand,
  deleteCommand,
  commandInfo,
  commandList,
} = require('./controllers/commands');
const {
  callQuote,
  addQuote,
  editQuote,
  deleteQuote,
} = require('./controllers/quotes');
const { 
  callTimer,
  timersLength,
  addTimer,
  removeTimer,
  timerList
} = require('./controllers/timers')
const { errorLogging } = require('./errors/errors');
const opts = require('./opts');

const client = new tmi.client(opts);

let soDebounce = false

onMessageHandler = async (channel, user, msg, self) => {
  if (self) return;
  if (msg[0] !== '!') return;

  const command = msg.split(' ')[0];
  let response = '';
  
  if (command === '!so') {
    if (soDebounce) return
    else {
      soDebounce = true
      setTimeout(() => { 
        soDebounce = false
      }, 3000)
    }
  }

  try {
    switch (command) {
      case '!so':
        response = await shoutout(msg, user)
        break;
      case '!addchallenge':
        response = await addChallenge(msg, user)
        break;
      case '!addcommand':
        response = await addCommand(msg, user);
        break;
      case '!editcommand':
        response = await editCommand(msg, user);
        break;
      case '!deletecommand':
        response = await deleteCommand(msg, user);
        break;
      case '!commandinfo':
        response = await commandInfo(msg);
        break;
      case '!commandlist':
        response = await commandList();
        break;
      case '!quote':
        response = await callQuote(msg);
        break;
      case '!addquote':
        response = await addQuote(msg, user);
        break;
      case '!editquote':
        response = await editQuote(msg, user);
        break;
      case '!deletequote':
        response = await deleteQuote(msg, user);
        break;
      case '!addtimer':
        response = await addTimer(msg, user);
        break;
      case '!removetimer':
        response = await removeTimer(msg, user);
        break;
      case '!timerlist':
        response = await timerList(user);
        break;
      default:
        response = await callCommand(msg);
    }
  } catch (err) {
    response = await errorLogging(err);
  } finally {
    if (!response) return
    return client.say(channel, response);
  }
};

onConnectedHandler = (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);

  let messageNumber = 0
  setInterval(async () => {
    // Check that messageNumber doesn't exceed number of messages
    const length = await timersLength()
    if (messageNumber > (length - 1)) messageNumber = 0
    const message = await callTimer(messageNumber++)
    client.say(opts.channels[0], message)
  }, 3000)
};

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

module.exports = { onMessageHandler };
