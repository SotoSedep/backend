const router = require('express').Router()
const menu = require('./menu')
const temporary = require('./temporary')
const karyawan = require('./karyawan')
const meja = require('./meja')
const nota = require('./nota')
const rekap = require('./rekap')

router.use('/menu',menu)
router.use('/temporary',temporary)
router.use('/karyawan',karyawan)
router.use('/meja',meja)
router.use('/nota',nota)
router.use('/rekap',rekap)

module.exports=router