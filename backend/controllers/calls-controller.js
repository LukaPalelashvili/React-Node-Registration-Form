const Call = require('../models/call')
const User = require('../models/user')
const { validationResult } = require('express-validator')

const createCall = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { name, phone, username } = req.body

  let existingUsername

  try {
    existingUsername = await User.findOne({ username })
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Internal server error'
    })
  }

  if (!existingUsername) {
    res.status(403).json({
      status: 403,
      message: 'Username is invalid'
    })
  }

  const createdCall = new Call({
    name,
    phone,
    username,
    date: new Date()
  })

  try {
    await createdCall.save()
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 500,
      message: 'Internal server error'
    })
  }

  res.json({
    ...createdCall,
    message: 'Call created successfully'
  })
}

exports.createCall = createCall
