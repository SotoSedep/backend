const controller = require('../controller/pembelianPerCabangController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',authentification,controller.regUpdate)
router.post('/listByTanggal',authentification,controller.listByTanggal)
router.post('/listByBulanTahun',authentification,controller.listByBulanTahun)


module.exports=router