# Hans Grubber Bot

[Commands](#commands) | [Moderator Commands](#moderator-commands)

## Commands

Any command that isn't reserved for bot functionality can be called by using `!<commandname>`, e.g:

> glaivemaster: !hello <br />
> hansGrubberBot: Hello World

Commands that don't exist will elicit a response as follows:

```
glaivemaster: !unknowncommand
hansGrubberBot: Command !unknowncommand does not exist
```

Commands must be called at the start of a sentence, but otherwise can be used within a sentence:

```
glaivemaster: !hello is a command...
hansGrubberBot: Hello World
glaivemaster: ...but can't be called at the end of a message !hello
glaivemaster: ...or in the middle !hello of a message
```

Currently all basic commands follow a call -> response paradigm i.e. you call a command and hansGrubberBot will respond with a chat message.

`!commandlist`

Will respond with a link to a list of all existing command words

```
glaivemaster: !commandlist
hansGrubberBot: https://shanodin.co.uk/command-list
```

`!commandinfo <commandname>`

**To be implemented.**

Will respond with the number of times a command has been called.

```
glaivemaster: !commandinfo morning
hansGrubberBot: Command !morning has been used 420 times
```

## Moderator commands

Some specific commands are reserved for use only by moderators. These commands have specific usages and error messages.

### !addcommand

Add a command to the database.

`!addcommand <commandname> <commandtext>`

```
glaivemaster: !addcommand morning Morning all
hansGrubberBot: Added command !morning -> "Morning all"
```

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

```
glaivemaster: !editcommand morning Morning is a state of mind
hansGrubberBot: Updated command !morning -> "Morning is a state of mind"
```

`<commandname>`<br />

- Follows all rules of `!addcommand`
- MUST be an existing command

`<commandtext>`<br />

- Follows all the rules of `!addcommand`

Edit command CANNOT be used to alter the command NAME of an existing command. To do so, you must create a new command with that name (and preferably delete the existing one)

### !deletecommand

Deletes a command from the database.

`!deletecommand <commandname>`

```
glaivemaster: !deletecommand morning
hansGrubberBot: Deleted command !morning
```

`<commandname>`<br />

- MUST exist in the database

No other information is required.
