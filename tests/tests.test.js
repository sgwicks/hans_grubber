const hansGrubber = require('../hansGrubber');
const commandControllers = require('../controllers/commands');
const { createCommand } = require('../models/commands');
const tmi = require('tmi.js');
const connection = require('../db/connection');

jest.mock('tmi.js');
jest.mock('../controllers/commands');
const callCom = commandControllers.callCommand;
const { callCommand, addCommand } = jest.requireActual(
  '../controllers/commands'
);

beforeEach(() => {
  return connection.seed.run();
});

afterEach(() => {
  callCom.mockReset();
});

afterAll(() => {
  return connection.destroy();
});

describe('onMessageHandler', () => {
  test('Ignores non-command messages', () => {
    const msg = 'hello';

    hansGrubber.onMessageHandler(null, null, msg, null);

    expect(callCom).not.toHaveBeenCalled();
  });

  test('Ignores messages from self', () => {
    hansGrubber.onMessageHandler(null, null, null, true);

    expect(callCom).not.toHaveBeenCalled();
  });

  test('Responds to command messages', async () => {
    const msg = '!hello';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(callCom).toHaveBeenCalledWith('!hello');
  });

  describe('callCommand', () => {
    test('Valid commands return command_text', async () => {
      const hello = await callCommand('!hello');

      expect(hello).toBe('Hello World');
    });

    test('Invalid commands return does not exist', async () => {
      const noHello = await callCommand('!goodbye');

      expect(noHello).toBe('Command !goodbye does not exist');
    });

    test('Increments call_count', async () => {
      await callCommand('!hello');

      const command_uses = await connection('commands')
        .select('command_uses')
        .where({ command_name: 'hello' })
        .then(res => res[0].command_uses);

      expect(command_uses).toBe(1);
    });
  });

  describe('addCommand', () => {
    test('Recognises new command_name', async () => {
      const msg = '!addcommand butter yum butter';

      await addCommand(msg);

      const command_name = await connection('commands')
        .select('command_name')
        .where({ command_name: 'butter' })
        .then(res => res[0].command_name);

      expect(command_name).toBe('butter');
    });
    test('Recognises new command_text', async () => {
      const msg = '!addcommand butter yum butter';

      await addCommand(msg);

      const command_text = await connection('commands')
        .select('command_text')
        .where({ command_name: 'butter' })
        .then(res => res[0].command_text);

      expect(command_text).toBe('yum butter');
    });
  });

  xdescribe('editCommand', () => {});

  xdescribe('deleteCommand', () => {});

  xdescribe('!info', () => {});

  xdescribe('!commandlist', () => {});
});
