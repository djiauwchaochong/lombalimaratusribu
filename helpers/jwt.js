const jwt = require('jsonwebtoken')
const secret = 'abcd'

function createToken (payload) {
  return jwt.sign(payload, secret)
}

function verifyToken (payload) {
  return jwt.verify(payload, secret)
}

module.exports = {
  createToken,
  verifyToken
}