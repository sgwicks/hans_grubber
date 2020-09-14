const tmi = require('tmi.js');
const {
  callCommand,
  addCommand,
  editCommand,
} = require('./controllers/commands');

const opts = {
  connection: {
    cluster: 'aws',
    reconnect: true,
  },
  identity: {
    username: 'beelzegrubbot',
    password: 'oauth:bxezz2u9zutn9ihak1lj2jgh451lxr',
  },
  channels: ['shanodin'],
};

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
    // if (command === '!addcommand') response = await addCommand(msg);
    // else if (command === '!editcommand') response = await editCommand(msg);
    // else response = await callCommand(msg);
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
