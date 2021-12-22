const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const UserController = require('./controllers/userController')
const auth = require('./middlewares/auth')

app.use(cors())
app.use(express.json())
app.use('/', express.urlencoded({extended: false}))

app.post('/login', UserController.login)

// MIDDLEWARES
app.use(auth)

app.post('/user', UserController.createUser)
app.patch('/user', UserController.editUser)
app.delete('/user', UserController.deleteUser)

app.listen(port, () => {
  console.log(`Server is running`);
})