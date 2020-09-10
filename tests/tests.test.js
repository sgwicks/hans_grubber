const connection = require('../db/connection');
const hansGrubber = require('../hansGrubber');
const commandControllers = require('../controllers/commands');
const tmi = require('tmi.js');

jest.mock(tmi.client.say);
jest.mock('../controllers/commands');
const callCom = commandControllers.callCommand;

afterEach(() => {
  callCom.mockReset();
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
  test('Responds to command messages', () => {
    const msg = '!hello';
    const promise = new Promise(() => 'world');
    callCom.mockReturnValue(promise);

    hansGrubber.onMessageHandler(null, null, msg, null);

    expect(callCom).toHaveBeenCalledWith('!hello');
  });
  describe('addCommand', () => {});
});
