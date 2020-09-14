const tmi = require('tmi.js');
const {
  callCommand,
  addCommand,
  editCommand,
} = require('./controllers/commands');
const opts = require('./opts');

const client = new tmi.client(opts);

onMessageHandler = async (target, context, msg, self) => {
  if (self) return;
  if (msg[0] !== '!') return;

  const command = msg.split(' ')[0];
  let response = '';

  try {
    switch (command) {
      case '!addcommand':
        response = await addCommand(msg);
      case '!editcommand':
        response = await editCommand(msg);
      default:
        response = await callCommand(msg);
    }
  } catch (err) {
    console.log(err);
    response = 'Beep boop, something went wrong';
  } finally {
    return client.say(target, response);
  }
};

onConnectedHandler = (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
};

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

module.exports = { onMessageHandler };
