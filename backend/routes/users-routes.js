const express = require('express')
const { body } = require('express-validator')

const usersController = require('../controllers/users-controllers')

const router = express.Router()

router.post(
  '/signup',
  [
    body('username').not().isEmpty(),
    body('password').isLength({ min: 6 }),
    body('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password')
      }
      return true
    })
  ],
  usersController.signup
)

router.post('/login', usersController.login)

module.exports = router
