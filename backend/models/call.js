const mongoose = require('mongoose')

const Schema = mongoose.Schema

const callSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  username: { type: String, required: true },
  date: { type: Date, required: true }
})

module.exports = mongoose.model('Call', callSchema)
