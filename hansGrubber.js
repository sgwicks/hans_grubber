const tmi = require('tmi.js');
const {
  callCommand,
  addCommand,
  editCommand,
  deleteCommand,
  commandInfo,
  commandList,
} = require('./controllers/commands');
const { errorLogging } = require('./errors/errors');
const opts = require('./opts');

const client = new tmi.client(opts);

onMessageHandler = async (channel, user, msg, self) => {
  if (self) return;
  if (msg[0] !== '!') return;

  const command = msg.split(' ')[0];
  let response = '';

  try {
    switch (command) {
      case '!addcommand':
        response = await addCommand(msg, user);
      case '!editcommand':
        response = await editCommand(msg, user);
      case '!deletecommand':
        response = await deleteCommand(msg, user);
      case '!commandinfo':
        response = await commandInfo(msg);
      case '!commandlist':
        response = await commandList();
      default:
        response = await callCommand(msg);
    }
  } catch (err) {
    response = await errorLogging(err);
  } finally {
    return client.say(channel, response);
  }
};

onConnectedHandler = (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
};

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

module.exports = { onMessageHandler };
