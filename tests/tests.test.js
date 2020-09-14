const hansGrubber = require('../hansGrubber');
const commandControllers = require('../controllers/commands');
const tmi = require('tmi.js');
const connection = require('../db/connection');
const { del } = require('../db/connection');

jest.mock('tmi.js');

jest.mock('../controllers/commands');
const mockCallCommand = commandControllers.callCommand;
const mockAddCommand = commandControllers.addCommand;
const mockEditCommand = commandControllers.editCommand;
const mockDeleteCommand = commandControllers.deleteCommand;
const {
  callCommand,
  addCommand,
  editCommand,
  deleteCommand,
} = jest.requireActual('../controllers/commands');

beforeEach(() => {
  return connection.seed.run();
});

afterEach(() => {
  mockCallCommand.mockReset();
  mockAddCommand.mockReset();
  mockEditCommand.mockReset();
  mockDeleteCommand.mockReset();
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

  test('Responds to !deletecommand', async () => {
    const msg = '!deletecommand test';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockDeleteCommand).toHaveBeenCalledWith(msg);
  });

  test.todo('Responds to !commandinfo');

  test.todo('Responds to !commandlist');
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

describe('editCommand', () => {
  test('Edits command in database', async () => {
    const msg = '!editcommand hello goodbye world';

    await editCommand(msg);

    const command_text = await connection('commands')
      .select('command_text')
      .where({ command_name: 'hello' })
      .then(res => res[0].command_text);

    expect(command_text).toBe('goodbye world');
  });

  test('Returns a chat message', async () => {
    const msg = '!editcommand hello return a chat message';

    const editedMessage = await editCommand(msg);

    expect(editedMessage).toBe(
      'Updated command !hello -> "return a chat message"'
    );
  });

  test('ERROR: Command does not exist', async () => {
    const msg = '!editcommand noncommand not a command';

    const errorText = await editCommand(msg);

    expect(errorText).toBe(
      'Edit command failed: command !noncommand does not exist'
    );
  });

  test('ERROR: undefined command_text', async () => {
    const msg = '!editcommand hello';

    const errorText = await editCommand(msg);

    expect(errorText).toBe('Edit command failed: no command text provided');
  });

  test('ERROR: undefined command_name', async () => {
    const msg = '!editcommand ';

    const errorText = await editCommand(msg);

    expect(errorText).toBe('Edit command failed: no command name provided');
  });
});

describe('deleteCommand', () => {
  test('Removes command from database', async () => {
    const msg = '!deletecommand test';

    await deleteCommand(msg);

    const isDeleted = await connection('commands')
      .select('command_name')
      .where({ command_name: 'test' })
      .then(res => res);

    expect(isDeleted.length).toBe(0);
  });

  test('Returns a chat message', async () => {
    const msg = '!deletecommand test';

    const deletedCommand = await deleteCommand(msg);

    expect(deletedCommand).toBe('Deleted command !test');
  });

  test('ERROR: Command does not exist', async () => {
    const msg = '!deletecommand butter';

    const errorText = await deleteCommand(msg);

    expect(errorText).toBe(
      'Delete command failed: command !butter does not exist'
    );
  });

  test('ERROR: No command_name specified', async () => {
    const msg = '!deletecommand ';

    const errorText = await deleteCommand(msg);

    expect(errorText).toBe('Delete command failed: no command name provided');
  });
});

xdescribe('!info', () => {});

xdescribe('!commandlist', () => {});
