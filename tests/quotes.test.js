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
  test.todo('Given a number, responds with a specific quote');
  test.todo('If no quote exists for number, returns a message');
  test.todo('Returns a quote includes a given string');
  test.todo('If no quote exists matching string, returns a message');
  test.todo('Appends game where it exists');
  test.todo('Increments call count');
});

xdescribe('addQuote', () => {
  test.todo('Adds quote to database');
  test.todo('Adds game to database when given');
  test.todo('Returns chat message');
  test.todo("Doesn't respond to non-moderators");
  test.todo('Responds to valid user-id');
  test.todo('ERROR: no quote text provided');
  test.todo('ERROR: no game provided when game called');
});

xdescribe('editQuote', () => {
  test.todo('Edits quote by number');
  test.todo('Edits quote game when called');
  test.todo('Returns chat message');
  test.todo("Doesn't respond to non-moderators");
  test.todo('Responds to valid user-id');
  test.todo('ERROR: no number provided');
  test.todo('ERROR: quote does not exist');
  test.todo('ERROR: no quote text provided');
  test.todo('ERROR: no game provided when game called');
});

xdescribe('deleteQuote', () => {
  test.todo('Deletes quote by number');
  test.todo('Returns chat message');
  test.todo("Doesn't respond to non-moderators");
  test.todo('Responds to valid user-id');
  test.todo('ERROR: no number provided');
  test.todo('ERROR: quote does not exist');
});
