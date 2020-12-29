const router = require('express').Router()
const menu = require('./menu')
const temporary = require('./temporary')
const karyawan = require('./karyawan')


router.use('/menu',menu)
router.use('/temporary',temporary)
router.use('/karyawan',karyawan)

module.exports=router