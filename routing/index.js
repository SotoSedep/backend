const router = require('express').Router()
const menu = require('./menu')
const temporary = require('./temporary')
const karyawan = require('./karyawan')
const meja = require('./meja')
const nota = require('./nota')

router.use('/menu',menu)
router.use('/temporary',temporary)
router.use('/karyawan',karyawan)
router.use('/meja',meja)
router.use('/nota',nota)

module.exports=router