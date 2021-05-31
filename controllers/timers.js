const { 
  selectTimer,
  getTimersLength,
  insertTimer,
  deleteTimer,
  getTimerList
} = require('../models/timers')

exports.timersLength = () => {
  return getTimersLength()
}

exports.callTimer = (id) => {
  return selectTimer(id)
}

exports.addTimer = (msg, user) => {
  return insertTimer(msg, user)
}

exports.removeTimer = (id, user) => {
  return deleteTimer(id, user)
}

exports.timerList = (user) => {
  return getTimerList(user)
}