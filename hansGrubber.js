const tmi = require('tmi.js');

const opts = {
  identity: {
    username: 'beelzegrubbot',
    password: 'oauth:th5nxylvhfrowm59io663iyohm27qs',
  },
  channels: ['shanodin'],
};

const client = new tmi.client(opts);

onMessageHandler = (target, context, msg, self) => {
  if (self) return;

  const commandName = msg.trim();

  if (commandName === '!hello') {
    client.say(target, 'Hello World');
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
};

onConnectedHandler = (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
};

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();
