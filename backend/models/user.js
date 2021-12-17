const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  email: {
    type: String,
    require: true,
    index: true,
    unique: true,
    sparse: true
  },
  password: { type: String, required: true, minlength: 6, confirm: true }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
