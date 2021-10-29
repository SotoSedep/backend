const controller = require('../controller/absensiController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')


router.post('/register',authentification,authorizationAdmin,controller.regUpdate)
router.post('/listByTanggal',controller.listByTanggal)
router.get('/absensiByKaryawanId/:karyawanId/:bulan/:tahun',controller.absensiByKaryawanId)
router.post('/rekapKaryawanBulanan',controller.rekapKaryawanBulanan)

module.exports=router