const hansGrubber = require('../hansGrubber');
const commandControllers = require('../controllers/commands');
const quoteControllers = require('../controllers/quotes');
const tmi = require('tmi.js');
const { shoutout } = require('../api/api')

jest.mock('tmi.js');

jest.mock('../controllers/commands');
const mockCallCommand = commandControllers.callCommand;
const mockAddCommand = commandControllers.addCommand;
const mockEditCommand = commandControllers.editCommand;
const mockDeleteCommand = commandControllers.deleteCommand;
const mockCommandInfo = commandControllers.commandInfo;
const mockCommandList = commandControllers.commandList;

jest.mock('../controllers/quotes');
const mockCallQuote = quoteControllers.callQuote;
const mockAddQuote = quoteControllers.addQuote;
const mockEditQuote = quoteControllers.editQuote;
const mockDeleteQuote = quoteControllers.deleteQuote;

jest.mock('../api/api')
const mockShoutout = shoutout

afterEach(() => {
  mockCallCommand.mockReset();
  mockAddCommand.mockReset();
  mockEditCommand.mockReset();
  mockDeleteCommand.mockReset();
  mockCallQuote.mockReset();
  mockAddQuote.mockReset();
  mockEditQuote.mockReset();
  mockDeleteQuote.mockReset();
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

  test('Responds to !quote', async () => {
    const msg = '!quote';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockCallQuote).toHaveBeenCalledWith('!quote');
  });

  test('Responds to !addquote', async () => {
    const msg = '!addquote';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockAddQuote).toHaveBeenCalledWith('!addquote', null);
  });

  test('Responds to !editquote', async () => {
    const msg = '!editquote';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockEditQuote).toHaveBeenCalledWith('!editquote', null);
  });

  test('Responds to !deletequote', async () => {
    const msg = '!deletequote';

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockDeleteQuote).toHaveBeenCalledWith('!deletequote', null);
  });

  test('Responds to !so', async () => {
    const msg = '!so kikibunny'

    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockShoutout).toHaveBeenCalledWith('!so kikibunny', null)
  })

  test('!so 3 second debounce cancels close calls', async () => {
    const msg = '!so kikibunny'

    await hansGrubber.onMessageHandler(null, null, msg, null);
    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockShoutout).toHaveBeenCalledTimes(1)
  })

  test('!so 5 second debounce lasts 3 seconds', async () => {
    const msg = '!so kikibunny'

    await hansGrubber.onMessageHandler(null, null, msg, null);
    await new Promise(resolve =>setTimeout(resolve, 3001))
    await hansGrubber.onMessageHandler(null, null, msg, null);

    expect(mockShoutout).toHaveBeenCalledTimes(2)
  })
});
