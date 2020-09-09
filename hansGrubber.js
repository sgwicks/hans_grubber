const tmi = require('tmi.js');
const dbConfig = require('./knexfile');
const knex = require('knex')(dbConfig);

const opts = {
  connection: {
    cluster: 'aws',
    reconnect: true,
  },
  identity: {
    username: 'beelzegrubbot',
    password: 'oauth:bxezz2u9zutn9ihak1lj2jgh451lxr',
  },
  channels: ['glaivemaster'],
};

const client = new tmi.client(opts);

onMessageHandler = (target, context, msg, self) => {
  if (self) return;
  if (msg[0] !== '!') return;

  const commandName = msg.split(' ')[0].slice(1);

  callCommand(target, commandName);

  // if (commandName === '!bgbot') {
  //   client.say(target, 'Hello World');
  //   console.log(`* Executed ${commandName} command`);
  // } else {
  //   console.log(`* Unknown command ${commandName}`);
  // }
};

onConnectedHandler = (addr, port) => {
  console.log(`* Connected to ${addr}:${port}`);
};

callCommand = (target, command_name) => {
  return knex('commands')
    .select('command_text')
    .where({ command_name })
    .then(([{ command_text }]) => client.say(target, command_text))
    .catch(err => console.log(err));
};

addNewCommand = (command, message) => {};

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();
