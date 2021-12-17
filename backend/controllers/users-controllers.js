const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const signup = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.json({
      status: 400,
      message: 'Validation failed'
    })
  }

  const { username, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ username })
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Internal server error'
    })
  }

  if (existingUser) {
    return res.status(409).json({
      status: 409,
      message: 'User already exists'
    })
  }

  let hashedPassword
  try {
    hashedPassword = await bcrypt.hash(password, 12)
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Internal server error'
    })
  }

  const createdUser = new User({
    username,
    password: hashedPassword
  })

  try {
    await createdUser.save()
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Internal server error'
    })
  }

  res.status(201).json({
    status: 201,
    userId: createdUser.id,
    username: createdUser.username
  })
}

const login = async (req, res, next) => {
  const { username, password } = req.body

  let existingUser

  try {
    existingUser = await User.findOne({ username })
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Internal server error'
    })
  }

  if (!existingUser) {
    res.status(403).json({
      status: 403,
      message: 'Invalid credentials'
    })
  }

  let isValidPassword = false
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password)
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Internal server error'
    })
  }

  if (!isValidPassword) {
    return res.status(403).json({
      status: 403,
      message: 'Incorrect password'
    })
  }

  let token
  try {
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      'supersecretkey',
      { expiresIn: '1d' },
      'HS256'
    )
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: 'Error while creating token'
    })
  }

  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    token: token
  })
}

exports.signup = signup
exports.login = login
