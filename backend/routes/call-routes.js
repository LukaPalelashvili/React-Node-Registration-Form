const express = require('express')
const { body } = require('express-validator')

const callsController = require('../controllers/calls-controller')

const router = express.Router()

router.post(
  '/new',
  [
    body('name')
      .not()
      .isEmpty()
      .isAlpha()
      .withMessage('Name must be alphabetic'),
    body('phone')
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage('Phone number must numeric'),
    body('userId').not().isEmpty().withMessage('UserId must not be empty')
  ],
  callsController.createCall
)

module.exports = router
