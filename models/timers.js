const connection = require('../db/connection')
const permittedUsers = require('../user-ids');

const permittedUserIds = Object.values(permittedUsers);

exports.getTimersLength = async () => {
  const [{ count }] = await connection('timers').count('id')

  return count
}

exports.selectTimer = async (id = 0) => {
  const timers = await connection('timers')
    .select('timer_text', 'id')

  return timers[id].timer_text
}

exports.insertTimer = async (msg, user) => {
  if (!user.mod) {
    if (!permittedUserIds.includes(user['user-id']))
      return 'Only mods can use this command'
  }
  await connection('timers').insert({ timer_text: msg })
  return `New timer message added: "${msg}"`
}

exports.deleteTimer = async (id, user) => {
  if (!user.mod) {
    if (!permittedUserIds.includes(user['user-id']))
      return 'Only mods can use this command'
  }
  const [response] = await connection('timers').where({ id }).returning('timer_text').del()
  return `Timer deleted: "${response}"`
}

exports.getTimerList = async (user) => {
  if (!user.mod) {
    if (!permittedUserIds.includes(user['user-id']))
      return 'Only mods can use this command'
  }
  const timers = await connection('timers').select('id', 'timer_text')

  return timers.map(({id, timer_text}) => {
    const reducedText = timer_text.slice(0, 25)
    return `{ ${id}: ${reducedText} }`
  }).join(', ')
}