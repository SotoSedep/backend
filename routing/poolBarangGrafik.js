const controller = require('../controller/poolBarangGrafikController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')


router.post('/register',authentification,authorizationAdmin,controller.register)
router.post('/update',authentification,authorizationAdmin,controller.update)
router.post('/delete',authentification,authorizationAdmin,controller.delete)
router.get('/listPerbulan/:bulan/:tahun',controller.listPerbulan)

module.exports=router