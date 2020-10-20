const {
  callQuote,
  addQuote,
  editQuote,
  deleteQuote,
} = require('../controllers/quotes');
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

describe('addQuote', () => {
  test('Adds quote to database', async () => {
    const msg = '!addquote this is a new quote';
    const user = { mod: true, 'user-id': '000' };

    await addQuote(msg, user);

    const addedQuote = await callQuote('!quote 4');

    expect(addedQuote).toBe('this is a new quote');
  });
  test('Adds game to database when given', async () => {
    const msg = '!addquote this quote has a game !game some game';
    const user = { mod: true, 'user-id': '000' };

    await addQuote(msg, user);

    const addedQuote = await callQuote('!quote 4');

    expect(addedQuote).toBe('this quote has a game (some game)');
  });
  test('Returns chat message', async () => {
    const msg = '!addquote this quote returns a chat message';
    const user = { mod: true, 'user-id': '000' };

    const chatMessage = await addQuote(msg, user);

    expect(chatMessage).toBe(
      'Quote added: "this quote returns a chat message"'
    );
  });
  test("Doesn't respond to non-moderators", async () => {
    const msg = '!addquote I am not a mod';
    const user = { mod: false, 'user-id': '000' };

    const errorMsg = await addQuote(msg, user);

    expect(errorMsg).toBe('Add quote failed: only moderators can add quotes');
  });
  test('Responds to valid user-id', async () => {
    const msg = '!addquote I am a special user';
    const user = { mod: false, 'user-id': '42340677' };

    const addedQuote = await addQuote(msg, user);

    expect(addedQuote).toBe('Quote added: "I am a special user"');
  });
  test('ERROR: no quote text provided', async () => {
    const msg = '!addquote ';
    const user = { mod: true, 'user-id': '000' };

    const errorMsg = await addQuote(msg, user);

    expect(errorMsg).toBe('Add quote failed: no quote text provided');
  });
  test('ERROR: no game provided when game called', async () => {
    const msg = '!addquote call game with no game !game';
    const user = { mod: true, 'user-id': '000' };

    const errorMsg = await addQuote(msg, user);

    expect(errorMsg).toBe('Add quote failed: called !game with no game');
  });
});

describe('editQuote', () => {
  test('Edits quote by number', async () => {
    const msg = '!editquote 1 this is a new quote';
    const user = { mod: true, 'user-id': '000' };

    await editQuote(msg, user);

    const editedQuote = await callQuote('!quote 1');

    expect(editedQuote).toBe('this is a new quote (test)');
  });
  test('Edits quote game when called', async () => {
    const msg = '!editquote 1 updates the game !game new game';
    const user = { mod: true, 'user-id': '000' };

    await editQuote(msg, user);

    const editedQuote = await callQuote('!quote 1');

    expect(editedQuote).toBe('updates the game (new game)');
  });
  test('Returns chat message', async () => {
    const msg = '!editquote 1 return a chat message';
    const user = { mod: true, 'user-id': '000' };

    const editedQuote = await editQuote(msg, user);

    expect(editedQuote).toBe(
      'Edited quote 1 -> "return a chat message (test)"'
    );
  });
  test("Doesn't respond to non-moderators", async () => {
    const msg = '!editquote 1 this is not allowed';
    const user = { mod: false, 'user-id': '000' };

    const errorMsg = await editQuote(msg, user);

    expect(errorMsg).toBe(
      'Edit quote failed: only moderators may use this action'
    );
  });
  test('Responds to valid user-id', async () => {
    const msg = '!editquote 1 this is allowed';
    const user = { mod: false, 'user-id': '42340677' };

    const message = await editQuote(msg, user);

    expect(message).toBe('Edited quote 1 -> "this is allowed (test)"');
  });
  test('ERROR: no number provided', async () => {
    const msg = `!editquote no number provided`;
    const user = { mod: true, 'user-id': '000' };

    const errorMsg = await editQuote(msg, user);

    expect(errorMsg).toBe('Edit quote failed: no quote number provided');
  });
  test('ERROR: quote does not exist', async () => {
    const msg = '!editquote 999 quote does not exist';

    const user = { mod: true, 'user-id': '000' };

    const errorMsg = await editQuote(msg, user);

    expect(errorMsg).toBe('Edit quote failed: quote number 999 does not exist');
  });
  test('ERROR: no quote text provided', async () => {
    const msg = '!editquote 1';
    const user = { mod: true, 'user-id': '000' };

    const errorMsg = await editQuote(msg, user);

    expect(errorMsg).toBe('Edit quote failed: no quote text provided');
  });
});

describe('deleteQuote', () => {
  test('Deletes quote by number', async () => {
    const msg = '!deletequote 1';
    const user = { mod: true, 'user-id': '000' };

    await deleteQuote(msg, user);

    const errorMsg = await callQuote('!quote 1');

    expect(errorMsg).toBe('Quote number 1 does not exist');
  });
  test.todo('Returns chat message');
  test.todo("Doesn't respond to non-moderators");
  test.todo('Responds to valid user-id');
  test.todo('ERROR: no number provided');
  test.todo('ERROR: quote does not exist');
});
