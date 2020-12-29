const router = require('express').Router()
const users = require('./users')
const menu = require('./menu')
const temporary = require('./temporary')

router.use('/users',users)
router.use('/menu',menu)
router.use('/temporary',temporary)

module.exports=router