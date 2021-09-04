const controller = require('../controller/rekapGajiController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',authentification,authorizationAdmin,controller.bulkRegister)
router.post('/update',authorizationAdmin,authorizationAdmin,controller.update)
router.get('/listByBulan/:bulan/:tahun',authentification,controller.listByBulan)

module.exports=router