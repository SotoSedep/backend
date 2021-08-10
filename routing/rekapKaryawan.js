const controller = require('../controller/rekapKaryawanController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',authentification,controller.register)
router.get('/listRekap',authentification,controller.listRekap)
router.get('/listByBulanTahun/:bulan/:tahun',controller.listByBulanTahun)
router.post('/update',authentification,controller.update)
router.post('/delete',authentification,controller.delete)


module.exports=router