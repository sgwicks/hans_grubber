# Hans Grubber Bot

[Commands](#commands) | [Quotes](#quotes) | [Moderator Commands](#moderator-commands)

## Commands

Any command that isn't reserved for bot functionality can be called by using `!<commandname>`, e.g:

> **glaivemaster:** !hello <br /> **hansGrubberBot:** Hello World

Commands must be called at the start of a sentence, but otherwise can be used within a sentence:

> **glaivemaster:** !hello is a command... <br />
> **hansGrubberBot:** Hello World <br />
> **glaivemaster:** ...but can't be called at the end of a message !hello <br />
> **glaivemaster:** ...or in the middle !hello of a message

Currently all basic commands follow a call -> response paradigm i.e. you call a command and hansGrubberBot will respond with a chat message.

`!commandlist`

Will respond with a link to a list of all existing command words

> **glaivemaster:** !commandlist <br />
> **hansGrubberBot:** http://18.133.242.218:3000/

`!commandinfo <commandname>`

**To be implemented.**

Will respond with the number of times a command has been called.

> **glaivemaster:** !commandinfo morning <br />
> **hansGrubberBot:** Command !morning has been used 420 times

## Quotes

A random quote can be called using `!quote` with no other text

> **glaivemaster:** !quote <br />
> **BeelzegrubBot:** Friends. I'm wierd and spooky

If the quote has a game listed for it, it will also return the game

> **glaivemaster:** !quote <br />
> **BeelzegrubBot:** How can I get this carrot out of my hole? (Donut County)

A specific quote can be called by appending a number after the command

> **glaivemaster:** !quote 29<br />
> **BeelzegrubBot:** Lava bad. Lava hot. (Hades)

A random quote containing a specific word can be called by adding text after the command

> **glaivemaster:** !quote dies<br />
> **BeelzegrubBot:** Let's do some competent platforming! \*dies instantly\*

A longer string of words can also be used

> **glaivemaster:** !quote lava bad<br />
> **BeelzegrubBot:** Lava bad. Lava hot. (Hades)

If it can't find a quote, it will return an error

> **glaivemaster:** !quote 5000<br />
> **BeelzegrubBot:** Quote number 5000 does not exist

> **glaivemaster:** !quote somenonsensestring<br />
> **BeelzegrubBot:** Quote matching string "somenonsensestring" does not exist

### !addquote

Add a new quote to the database

`!addquote <quotetext>`

> **glaivemaster:** !addquote I AM THE SPARTA
> **BeelzegrubBot:** Quote added: "I AM THE SPARTA"

A game can also be optionally added to a quote

`!addquote <quotetext> !game <gamename>`

> **glaivemaster:** !addquote I sure do done die a lot !game Dark Souls
> **BeelzegrubBot:** Quote added: "I sure do done die a lot (Dark Souls)" 

`<gamename>`
- *does not require* brackets
- must exist if `!game` is called (to leave game empty, don't use `!game` at all)

## Moderator commands

Some specific commands are reserved for use only by moderators. These commands have specific usages and error messages.

### !addcommand

Add a command to the database.

`!addcommand <commandname> <commandtext>`

> **glaivemaster:** !addcommand morning Morning all <br />
> **hansGrubberBot:** Added command !morning -> "Morning all"

`<commandname>`<br />

- Should be a plain word with no ! at the start.
- Should be a single, continuous word i.e. no whitespace (hypens and concatenated words are acceptable)
- MUST exist i.e. no empty command names
- MUST be unique i.e. no existing command uses this command name

`<commandtext>`<br />

- Should follow normal whitespace and punctuation as desired
- MUST exist i.e. no empty commands

### !editcommand

Edit an existing command in the database.

`!editcommand <commandname> <commandmessage>`

> **glaivemaster:** !editcommand morning Morning is a state of mind <br />
> **hansGrubberBot:** Updated command !morning -> "Morning is a state of mind"

`<commandname>`<br />

- Follows all rules of `!addcommand`
- MUST be an existing command

`<commandtext>`<br />

- Follows all the rules of `!addcommand`

Edit command CANNOT be used to alter the command NAME of an existing command. To do so, you must create a new command with that name (and preferably delete the existing one)

### !deletecommand

Deletes a command from the database.

`!deletecommand <commandname>`

> **glaivemaster:** !deletecommand morning<br />
> **hansGrubberBot:** Deleted command !morning

`<commandname>`<br />

- MUST exist in the database

### !editquote

Edit a quote based on its number

`!editquote <quote_number> <new_quote_text> !game <new_game>`

> **glaivemaster:** !editquote 101 I AM SPARTA
> **BeelzegrubBot:** Edited quote 101 -> "I AM SPARTA"

Calling `!game` on this command allows you to edit the game attached to a quote, whether or not it existed before.

> **glaivemaster:** !editquote 101 I AM SPARTA !game AC Odyssey
> **BeelzegrubBot:** Edited quote 101 -> "I AM SPARTA (AC Odyssey)"

Currently the implementation of *only* editing the game on a quote is broken (i.e. I forgot) so don't try to do it! If you want to edit a quote with a game, you also need to pass the entire quote text through the edit command (Sorry!!!!)

### !deletequote

Delete a quote based on its number

`!deletequote <quote_number>`

> **glaivemaster:** !deletequote 69
> **BeelzegrubBot:** Deleted quote 69

This won't change the number of any other quotes, so that if you delete a quote there will be 'holes' in the quote list. It's the easiest way, for now.

### !so

Give a shoutout to another Twitch user

`!so <username>`

> **shanodin:** !so glaivemaster
>**BeelzegrubBot:** Please take a moment to check out some Crusader Kings 3 action with glaivemaster. Give them a follow at twitch.tv/glaivemaster and check out their amazing content!

## To Do

- Return quote number with quote text
- Implement only changing game on a quote
- Re-implement `!so` command [x]
- Add subscriber/VIP/user capability to `!addquote` [x]
- Add a `quotelist` command similar to `commandlist`
- Auto-moderation?
- Timer messages
- Timer command to add a timer to the screen (or at least create an alert when time is up)
