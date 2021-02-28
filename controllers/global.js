const { callCommand, editCommand } = require('./commands')

exports.addChallenge = async (newChallenge, user) => {
  if (!user.mod) return 'Mods only!'
  try {
  const shapeChallenge = (command) => {
    const challenge = command.split(' ')[1]
    const [row, column] = challenge.split(',')
    const [rowNum] = row.match(/[0-5]/)
    const [colNum] = column.match(/[0-5]/)
    return `R${rowNum},C${colNum}`
  }
  const shapedChallenge = shapeChallenge(newChallenge)

  const currentBingo = await callCommand('!bingo')

  const shapeBingo = (bingo, newChallenge) => {
    const [text, challengeList] = bingo.split(': ')
    const splitChallengeList = challengeList.split(';')
    splitChallengeList.push(newChallenge)
    const sortedChallengeList = splitChallengeList
      .sort()
      .join('; ')

    return text + ': ' + sortedChallengeList
  }

  const shapedBingo = shapeBingo(currentBingo, shapedChallenge)

  const msg = `!editcommand bingo ${shapedBingo}`

  await editCommand(msg, user)

  return `New challenge added: ${shapedChallenge}. !bingo for a full list of current challenges`
  } catch (err) {
    return 'Something bad happened shanodFp Poke @glaivemaster or use the traditional edit command function'
  }
}
