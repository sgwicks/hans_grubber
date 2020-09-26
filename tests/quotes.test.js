const { TestScheduler } = require('jest');
const { callQuote } = require('../controllers/quotes');
const connection = require('../db/connection');

jest.mock('tmi.js');

beforeEach(() => {
  return connection.seed.run();
});

afterAll(() => {
  return connection.destroy();
});

describe('callQuote', () => {
  test('Responds with a quote', () => {
    const msg = '!quote';

    expect(callQuote(msg)).toBeDefined();
  });
});
