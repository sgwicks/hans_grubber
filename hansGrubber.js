const tmi = require('tmi.js');
const { callCommand, addCommand } = require('./controllers/commands');

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

  if (msg.startsWith('!addcommand')) {
    try {
      const commandAdded = await addCommand(msg);
      return client.say(target, commandAdded);
    } catch (err) {
      console.log(err);
      return client.say(target, 'Beep boop, something went wrong');
    }
  }

  try {
    const command_text = await callCommand(msg);
    return client.say(target, command_text);
  } catch (err) {
    console.log(err);
    return client.say(target, 'Beep boop, something went wrong');
  }
};

onConnectedHandler = (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
};

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

module.exports = { onMessageHandler };
