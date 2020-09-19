const hansGrubber = require('../hansGrubber');
const commandControllers = require('../controllers/commands');
const tmi = require('tmi.js');
const connection = require('../db/connection');

jest.mock('tmi.js');

jest.mock('../controllers/commands');
const mockCallCommand = commandControllers.callCommand;
const mockAddCommand = commandControllers.addCommand;
const mockEditCommand = commandControllers.editCommand;
const mockDeleteCommand = commandControllers.deleteCommand;
const mockCommandInfo = commandControllers.commandInfo;
const mockCommandList = commandControllers.commandList;
const {
  callCommand,
  addCommand,
  editCommand,
  deleteCommand,
  commandInfo,
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

    expect(mockAddCommand).toHaveBeenCalledWith(msg, null);
  });

  test('Responds to !editcommand', async () => {
    const msg = '!editcommand hello hello user';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockEditCommand).toHaveBeenCalledWith(msg, null);
  });

  test('Responds to !deletecommand', async () => {
    const msg = '!deletecommand test';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockDeleteCommand).toHaveBeenCalledWith(msg);
  });

  test('Responds to !commandinfo', async () => {
    const msg = '!commandinfo hello';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockCommandInfo).toHaveBeenCalledWith(msg);
  });

  test('Responds to !commandlist', async () => {
    const msg = '!commandlist';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockCommandList).toHaveBeenCalled();
  });
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
    const user = { mod: true, 'user-id': '000' };

    await addCommand(msg, user);

    const command_name = await connection('commands')
      .select('command_name')
      .where({ command_name: 'butter' })
      .then(res => res[0].command_name);

    expect(command_name).toBe('butter');
  });

  test('Recognises new command_text', async () => {
    const msg = '!addcommand butter yum butter';
    const user = { mod: true, 'user-id': '000' };

    await addCommand(msg, user);

    const command_text = await connection('commands')
      .select('command_text')
      .where({ command_name: 'butter' })
      .then(res => res[0].command_text);

    expect(command_text).toBe('yum butter');
  });

  test('Returns a chat message', async () => {
    const msg = '!addcommand butter yum butter';
    const user = { mod: true, 'user-id': '000' };

    const messageAdded = await addCommand(msg, user);

    expect(messageAdded).toBe('Added command !butter -> "yum butter"');
  });

  test('ERROR: command already exists', async () => {
    const msg = '!addcommand hello Hello Test World';
    const user = { mod: true, 'user-id': '000' };

    const messageError = await addCommand(msg, user);

    expect(messageError).toBe(
      'Add command failed: command !hello already exists'
    );
  });

  test('ERROR: undefined command_text', async () => {
    const msg = '!addcommand butter';
    const user = { mod: true, 'user-id': '000' };

    const messageError = await addCommand(msg, user);

    expect(messageError).toBe('Add command failed: no command text provided');
  });

  test('ERROR: undefined command_name', async () => {
    const msg = '!addcommand';
    const user = { mod: true, 'user-id': '000' };

    const messageError = await addCommand(msg, user);

    expect(messageError).toBe('Add command failed: no command name provided');
  });

  test("Doesn't respond to non-moderators", async () => {
    const msg = '!addcommand moderator You are a moderator';
    const user = { mod: false, 'user-id': '000' };

    const errorResponse = await addCommand(msg, user);

    expect(errorResponse).toBe(
      'Add command failed: Only moderators can use this command'
    );
  });

  test('Responds to valid user-id', async () => {
    const msg = '!addcommand moderator You are not a moderator';
    const user = { mod: false, 'user-id': '42340677' };

    const addedCommand = await addCommand(msg, user);

    expect(addedCommand).toBe(
      'Added command !moderator -> "You are not a moderator"'
    );
  });
});

describe('editCommand', () => {
  test('Edits command in database', async () => {
    const msg = '!editcommand hello goodbye world';
    const user = { mod: true, 'user-id': '000' };

    await editCommand(msg, user);

    const command_text = await connection('commands')
      .select('command_text')
      .where({ command_name: 'hello' })
      .then(res => res[0].command_text);

    expect(command_text).toBe('goodbye world');
  });

  test('Returns a chat message', async () => {
    const msg = '!editcommand hello return a chat message';
    const user = { mod: true, 'user-id': '000' };

    const editedMessage = await editCommand(msg, user);

    expect(editedMessage).toBe(
      'Updated command !hello -> "return a chat message"'
    );
  });

  test('ERROR: Command does not exist', async () => {
    const msg = '!editcommand noncommand not a command';
    const user = { mod: true, 'user-id': '000' };

    const errorText = await editCommand(msg, user);

    expect(errorText).toBe(
      'Edit command failed: command !noncommand does not exist'
    );
  });

  test('ERROR: undefined command_text', async () => {
    const msg = '!editcommand hello';
    const user = { mod: true, 'user-id': '000' };

    const errorText = await editCommand(msg, user);

    expect(errorText).toBe('Edit command failed: no command text provided');
  });

  test('ERROR: undefined command_name', async () => {
    const msg = '!editcommand ';
    const user = { mod: true, 'user-id': '000' };

    const errorText = await editCommand(msg, user);

    expect(errorText).toBe('Edit command failed: no command name provided');
  });

  test("Doesn't respond to non-moderators", async () => {
    const msg = '!editcommand hello A moderator was here';
    const user = { mod: false, 'user-id': '000' };

    const errorResponse = await editCommand(msg, user);

    expect(errorResponse).toBe(
      'Edit command failed: Only a moderator may use this command'
    );
  });

  test('Responds to permitted user-ids', async () => {
    const msg = '!editcommand hello Sam was here';
    const user = { mod: false, 'user-id': '42340677' };

    const editedCommand = await editCommand(msg, user);

    expect(editedCommand).toBe('Updated command !hello -> "Sam was here"');
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

  test.todo('Only responds to moderators');
});

describe('!commandinfo', () => {
  test('Returns command_uses', async () => {
    const msg = '!commandinfo hello';

    const command_uses = await commandInfo(msg);

    expect(command_uses).toBe('Command !hello has been used 0 times');
  });

  test('ERROR: command_name does not exist', async () => {
    const msg = '!commandinfo goodbye';

    const errorText = await commandInfo(msg);

    expect(errorText).toBe(
      'Command info failed: command !goodbye does not exist'
    );
  });
});

xdescribe('!commandlist', () => {});
