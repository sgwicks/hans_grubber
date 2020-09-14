const hansGrubber = require('../hansGrubber');
const commandControllers = require('../controllers/commands');
const tmi = require('tmi.js');
const connection = require('../db/connection');

jest.mock('tmi.js');

jest.mock('../controllers/commands');
const mockCallCommand = commandControllers.callCommand;
const mockAddCommand = commandControllers.addCommand;
const mockEditCommand = commandControllers.editCommand;
const { callCommand, addCommand } = jest.requireActual(
  '../controllers/commands'
);

beforeEach(() => {
  return connection.seed.run();
});

afterEach(() => {
  mockCallCommand.mockReset();
  mockAddCommand.mockReset();
  mockEditCommand.mockReset();
});

afterAll(() => {
  return connection.destroy();
});

describe('onMessageHandler', () => {
  test('Ignores non-command messages', () => {
    const msg = 'hello';

    hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockCallCommand).not.toHaveBeenCalled();
  });

  test('Ignores messages from self', () => {
    hansGrubber.onMessageHandler(null, null, null, true);

    expect(mockCallCommand).not.toHaveBeenCalled();
  });

  test('Responds to command call', async () => {
    const msg = '!hello';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockCallCommand).toHaveBeenCalledWith('!hello');
  });

  test('Responds to !addcommand', async () => {
    jest.requireActual('../controllers/commands');
    const msg = '!addcommand butter yum butter';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockAddCommand).toHaveBeenCalledWith(msg);
  });

  test('Responds to !editcommand', async () => {
    const msg = '!editcommand hello hello user';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockEditCommand).toHaveBeenCalledWith(msg);
  });
  test.todo('Responds to !deletecommand');
  test.todo('Responds to !commandinfo');
  test.todo('Responds to !commandlist');

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

    test('Returns a chat message', async () => {
      const msg = '!addcommand butter yum butter';

      const messageAdded = await addCommand(msg);

      expect(messageAdded).toBe('Added command !butter -> "yum butter"');
    });

    test('ERROR: command already exists', async () => {
      const msg = '!addcommand hello Hello Test World';

      const messageError = await addCommand(msg);

      expect(messageError).toBe(
        'Add command failed: command !hello already exists'
      );
    });

    test('ERROR: undefined command_text', async () => {
      const msg = '!addcommand butter';

      const messageError = await addCommand(msg);

      expect(messageError).toBe('Add command failed: no command text provided');
    });

    test('ERROR: undefined command_name', async () => {
      const msg = '!addcommand';

      const messageError = await addCommand(msg);

      expect(messageError).toBe('Add command failed: no command name provided');
    });
  });

  xdescribe('editCommand', () => {});

  xdescribe('deleteCommand', () => {});

  xdescribe('!info', () => {});

  xdescribe('!commandlist', () => {});
});
