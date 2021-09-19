const controller = require('../controller/setoranController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',authentification,controller.register)
router.get('/listBulanan/:bulan/:tahun',authentification,controller.listBulanan)
router.get('/listHarian/:tanggal/:bulan/:tahun',authentification,controller.listHarian)
router.post('/update',authentification,controller.update)
router.post('/delete',authentification,controller.delete)
router.post('/listHarian2',authentification,controller.listHarian2)
router.post('/detailsSetoranById',authentification,controller.detailsSetoranById)


module.exports=router