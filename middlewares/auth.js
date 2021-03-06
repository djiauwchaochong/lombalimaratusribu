const { verifyToken } = require("../helpers/jwt")

async function auth (req, res, next) {
  try {
    const { aksestoken } = req.headers
    if (!aksestoken) {
      throw new error
    }
    const payload = verifyToken(aksestoken)
    req.userLogin = payload.username
    next()
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = auth