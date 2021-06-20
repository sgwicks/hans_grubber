const connection = require('../db/connection')
const permittedUsers = require('../user-ids');

const permittedUserIds = Object.values(permittedUsers);

exports.getTimersLength = async () => {
  const [count] = await connection('timers').count('id')
  return count["count(`id`)"]
}

exports.selectTimer = async (id = 0) => {
  const timers = await connection('timers')
    .select('timer_text')

  return timers[id].timer_text
}

exports.insertTimer = async (msg, user) => {
  if (!user.mod) {
    if (!permittedUserIds.includes(user['user-id']))
      return 'Only mods can use this command'
  }
  const timer_text = msg.slice(10)
  await connection('timers').insert({ timer_text })
  return `New timer message added: "${timer_text}"`
}

exports.deleteTimer = async (msg, user) => {
  if (!user.mod) {
    if (!permittedUserIds.includes(user['user-id']))
      return 'Only mods can use this command'
  }
  const [, id] = msg.split(' ')

  const [response] = await connection('timers').where({ id: Number(id) })

  await connection('timers').where({ id: Number(id) }).del()

  return `Timer deleted: "${response.timer_text}"`
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