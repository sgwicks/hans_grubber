const hansGrubber = require('../hansGrubber');
const commandControllers = require('../controllers/commands');
const tmi = require('tmi.js');

jest.mock('tmi.js');

jest.mock('../controllers/commands');
const mockCallCommand = commandControllers.callCommand;
const mockAddCommand = commandControllers.addCommand;
const mockEditCommand = commandControllers.editCommand;
const mockDeleteCommand = commandControllers.deleteCommand;
const mockCommandInfo = commandControllers.commandInfo;
const mockCommandList = commandControllers.commandList;

afterEach(() => {
  mockCallCommand.mockReset();
  mockAddCommand.mockReset();
  mockEditCommand.mockReset();
  mockDeleteCommand.mockReset();
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

    expect(mockDeleteCommand).toHaveBeenCalledWith(msg, null);
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
