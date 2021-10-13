const controller = require('../controller/pembelianBanyumanikController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',authentification,controller.register)
router.post('/listByTanggal',authentification,controller.listByTanggal)
router.post('/update',authentification,controller.update)
router.post('/delete',authentification,controller.delete)
router.post('/listByBulanTahun',authentification,controller.listByBulanTahun)


module.exports=router