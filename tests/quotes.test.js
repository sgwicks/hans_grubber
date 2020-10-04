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
  test('Responds with a quote', async () => {
    const msg = '!quote';
    const quote = await callQuote(msg);

    expect(quote).toBeDefined();
    expect(quote).not.toEqual(expect.stringContaining('Error: check logs'));
  });
  test('Given a number, responds with a specific quote', async () => {
    const msg = '!quote 2';
    const quote = await callQuote(msg);
    expect(quote).toBe('Filler quote (filler)');
  });
  test('If no quote exists for number, returns a message', async () => {
    const msg = '!quote 5000';

    const error = await callQuote(msg);

    expect(error).toBe('Quote number 5000 does not exist');
  });
  test('Returns a quote includes a given string', async () => {
    const msg = '!quote filler';

    const quote = await callQuote(msg);

    expect(quote).toBe('Filler quote (filler)');
  });
  test('If no quote exists matching string, returns a message', async () => {
    const msg = '!quote banana';

    const error = await callQuote(msg);

    expect(error).toBe('Quote matching string "banana" does not exist');
  });
  test("Doesn't append brackets when game doesn't exist", async () => {
    const msg = '!quote 3';

    const quote = await callQuote(msg);

    expect(quote).not.toEqual(expect.stringContaining('('));
  });
  test('Increments call count', async () => {
    const msg = '!quote 1';

    await callQuote(msg);

    const { quote_uses } = await connection('quotes')
      .select('quote_uses')
      .where({ id: 1 })
      .then((res) => res[0]);

    expect(quote_uses).toBe(1);
  });
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
