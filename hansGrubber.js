const tmi = require('tmi.js');
const { callCommand } = require('./controllers/commands');

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

onMessageHandler = (target, context, msg, self) => {
  if (self) return;
  if (msg[0] !== '!') return;

  callCommand(msg)
    .then(command_text => client.say(target, command_text))
    .catch(err => console.log(err));
};

onConnectedHandler = (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
};

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

module.exports = { onMessageHandler };
