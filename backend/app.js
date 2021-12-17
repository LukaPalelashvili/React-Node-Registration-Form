const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const usersRoutes = require('./routes/users-routes')
const callRoutes = require('./routes/call-routes')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api/users', usersRoutes)
app.use('/api/call', callRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: 'Could not find that!' })
})

mongoose
  .connect(
    `mongodb+srv://admin:admin@cluster0.a7mh1.mongodb.net/sweeft?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(4000)
  })
  .catch(err => {
    console.log(err)
  })
