const tmi = require('tmi.js');

const opts = {
  identity: {
    username: 'glaivemaster',
    password: 'oauth:2soou84w072zq5aqkowq9dvm8o3v9q',
  },
  channels: ['glaivemaster'],
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
