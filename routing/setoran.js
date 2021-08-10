const controller = require('../controller/setoranController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',authentification,controller.register)
router.get('/listBulanan/:bulan/:tahun',authentification,controller.listBulanan)
router.post('/update',authentification,controller.update)
router.post('/delete',authentification,controller.delete)


module.exports=router