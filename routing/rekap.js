const controller = require('../controller/rekapController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationKasir, authorizationAdmin}=require('../middleware/authorization')


// router.post('/register',authentification,controller.register)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
router.get('/listShift1',authentification,controller.listShift1)
router.get('/listShift2',authentification,controller.listShift2)
router.get('/listShift3',authentification,controller.listShift3)
router.delete('/delete/:id',authentification,controller.delete)
router.post('/update/:id',authentification,controller.update)
router.post('/screening',authentification,authorizationKasir,controller.screening)
router.get('/rekapan',authentification,authorizationAdmin,controller.showRekap)


module.exports=router