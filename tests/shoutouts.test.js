const { ExpectationFailed } = require('http-errors');
const { TestScheduler } = require('jest');
const { shoutout } = require('../api/api')
const connection = require('../db/connection')

const { broadcaster, controller } = require('../user-ids');

beforeEach(() => {
  return connection.seed.run();
});

afterAll(() => {
  return connection.destroy();
});

describe('shoutout', () => {
  test('Shoutout response', async () => {
    const user = { mod: true }
    const response = await shoutout('!so kikibunny', user)
    expect(response).toBeTruthy()
  })
  test('ignores non-mods', async () => {
    const user = { mod: false, 'user-id': 'abc' }
    const response = await shoutout('!so kikibunny', user)
    expect(response).toBeFalsy()
  })
  test('accepts command from controller', async () => {
    const user = { mod: false, 'user-id': '42340677' }
    const response = await shoutout('!so kikibunny', user)
    expect(response).toBeTruthy()
  })
})