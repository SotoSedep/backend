const controller = require('../controller/absensiController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')


router.post('/register',authentification,authorizationAdmin,controller.register)
router.post('/update',authentification,authorizationAdmin,controller.update)
router.get('/listByTanggal',controller.listByTanggal)
router.get('/absensiByKaryawanId/:karyawanId/:bulan/:tahun',controller.absensiByKaryawanId)

module.exports=router