const utils = require('../utils.js')
/**
 * Takes as an input an object of the form:
 *
 * @param t1 - an object that is a timestamp
 * @param t2 - an object that is a timestamp
 * @param params - optional, params['time-limit'] defines the maximum
 *                 correlation time
 * @return score - between 1.0 and 0.0 and decreases
 * linear with increasing difference between timestamps. Time differences
 * greater than timeLimit will result in a score of 0.0.
 */
function closeTimestampPlugin (t1, t2, params) {
  const timeLimit = (params && params['time-limit']) || 600

  if ((typeof t1 === 'undefined') || (typeof t2 === 'undefined')) {
    throw new Error(`Two Timestamps as input are needed.`)
  }

  utils.isTimestamp(t1)
  utils.isTimestamp(t2)
  utils.isInteger(timeLimit)

  const difference = Math.abs(t1 - t2)
  return difference > timeLimit ? 0.0 : 1.0 - difference / timeLimit
}

module.exports = closeTimestampPlugin
