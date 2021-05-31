const {
  callTimer,
  addTimer,
  removeTimer,
  timerList
} = require('../controllers/timers');

const connection = require('../db/connection');

const { broadcaster, controller } = require('../user-ids');

beforeEach(() => {
  return connection.seed.run();
});

afterAll(() => {
  return connection.destroy();
});

describe('callTimer', () => {
  test('Returns a message', async () => {
    const message = await callTimer();

    expect(message).toBe('Timer message #1');
  })

  test('Can return message by index', async () => {
    const message = await callTimer(2);
    expect(message).toBe('Timer message #3')
  })
})

describe('addTimer', () => {
  test('Adds a new timer message', async () => {
    const msg = 'This is timer message #4'
    const user = { mod: true, 'user-id': '000' };

    await addTimer(msg, user)

    const response = await callTimer(3)

    expect(response).toBe(msg)
  })

  test('Responds with a chat message', async () => {
    const msg = 'This is timer #4'
    const user = { mod: true, 'user-id': '000' };

    const response = await addTimer(msg, user)

    expect(response).toBe('New timer message added: "This is timer #4"')
  })

  test('Ignores non-mod users', async () => {
    const user = { mod: false, 'user-id': '000' };

    const msg = 'This is timer #4'

    const response = await addTimer(msg, user)

    expect(response).toBe('Only mods can use this command')
  })

  test('Permits permitted users', async () => {
    const msg = 'This is timer #4'
    const user = { mod: false, 'user-id': broadcaster };

    const response = await addTimer(msg, user)

    expect(response).toBe('New timer message added: "This is timer #4"')
  })
})

describe('removeTimer', () => {
  test('Deletes a timer message by id', async () => {
    const user = { mod: true, 'user-id': '000' };
    await removeTimer(4, user)

    const message = await callTimer(1)

    expect(message).toBe('Timer message #3')
  })
  test('Responds with a chat message', async () => {
    const user = { mod: true, 'user-id': '000' };
    const response = await removeTimer(4, user)

    expect(response).toBe('Timer deleted: "Timer message #1"')
  })
  test('Ignores non-mod users', async () => {
    const user = { mod: false, 'user-id': '000' };

    const response = await removeTimer(4, user)

    expect(response).toBe('Only mods can use this command')
  })

  test('Permits permitted users', async () => {
    const user = { mod: false, 'user-id': broadcaster };

    const response = await removeTimer(4, user)

    expect(response).toBe('Timer deleted: "Timer message #1"')
  })
})

describe('timerList', () => {
  test('Responds with list of timers and their id', async () => {
    const user = { mod: true, 'user-id': '000' }
    const response = await timerList(user)

    expect(response).toBe('{ 4: Timer message #1 }, { 5: Timer message #2 }, { 6: Timer message #3 }')
  })
  test('Ignores non-mod users', async () => {
    const user = { mod: false, 'user-id': '000' };

    const response = await timerList(user)

    expect(response).toBe('Only mods can use this command')
  })
  test('Permits permitted users', async () => {
    const user = { mod: false, 'user-id': broadcaster };

    const response = await timerList(user)

    expect(response).toBe('{ 4: Timer message #1 }, { 5: Timer message #2 }, { 6: Timer message #3 }')
  })
})