const { comparePassword, hashPassword } = require('../helpers/bc')
const { createToken } = require('../helpers/jwt')
const { User } = require('../models')

class UserController {
  static async login (req, res) {
    try {
      const { username, password } = req.body
      const findUser = await User.findOne({
        where: {
          username
        }
      })
      if (findUser && findUser.is_deleted === false && findUser.is_actived === true) {
        const validPass = comparePassword(password, findUser.password)
        if (validPass) {
          const payload = {
            username: findUser.username
          }
          const token = createToken(payload)
          res.status(200).json({
            aksesToken: token
          })
        } else {
          throw new error
        }
      } else {
        throw new error
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error'
      })
    }
  }

  static async createUser (req, res) {
    try {
      const { username, password } = req.body
      let result = await User.create({
        username,
        password: hashPassword(password),
        is_actived: true,
        is_deleted: false,
        created_date: new Date().toString(),
        created_by: req.userLogin
      })
      res.status(201).json({
        username: result.username,
        created_date: result.created_date
      })
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error'
      })
    }
  }

  static async editUser (req, res) {
    try {
      const { newPassword, oldPassword } = req.body
      const foundUser = await User.findOne({
        where: {
          username: req.userLogin
        }
      })
      if (foundUser) {
        const checkPassword = comparePassword(oldPassword, foundUser.password)
        if (checkPassword) {
          console.log(checkPassword);
          await User.update({
            password: hashPassword(newPassword),
            changed_date: new Date().toString(),
            changed_by: req.userLogin
          } ,{
            where: {
              username: foundUser.username
            }
          })
          res.status(200).json('Success Edit')
        } else {
          throw new error
        }
      } else {
        throw new error
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error'
      })
    }
  }

  static async deleteUser (req, res) {
    try {
      const { username } = req.body
      console.log(username);
      if (username === req.userLogin) {
        throw new error
      }
      const foundUser = await User.findOne({
        where: {
          username
        }
      })
      if (foundUser) {
        await User.update({
          is_deleted: true,
          is_actived: false,
          deleted_by: req.userLogin,
          deleted_date: new Date().toString()
        } ,{
          where: {
            username
          }
        })
        res.status(200).json('Success Delete')
      } else {
        throw new error
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error'
      })
    }
  }

}

module.exports = UserController