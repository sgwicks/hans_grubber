const { addChallenge } = require('../controllers/global')
const { callCommand } = require('../controllers/commands')
const connection = require('../db/connection');

const { broadcaster, controller } = require('../user-ids');

beforeEach(() => {
  return connection.seed.run();
});

afterAll(() => {
  return connection.destroy();
});

describe('addChallenge', () => {
  test('Returns old text with new challenge added', async () => {
    const newChallenge = '3,2'
    const user = { mod: true, 'user-id': '000' };

    const newBingo = await addChallenge(newChallenge, user)
    const bingo = await callCommand('!bingo')

    expect(newBingo).toBe(`New challenge added: R3,C2. !bingo for a full list of current challenges`)
    expect(bingo).toBe('A list of goals that can be completed. Starting with 0 required and more being added via donation incentives. Current required squares: R3,C2; R3,C3')
  })
})