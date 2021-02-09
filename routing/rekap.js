const controller = require('../controller/rekapController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationKasir, authorizationAdmin}=require('../middleware/authorization')


// router.post('/register',authentification,controller.register)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
router.post('/listShift1',authentification,controller.listShift1)
router.post('/listShift2',authentification,controller.listShift2)
router.post('/listShift3',authentification,controller.listShift3)
router.delete('/delete/:id',authentification,controller.delete)
router.post('/update/:id',authentification,controller.update)
router.post('/screening',authentification,authorizationKasir,controller.screening)
router.post('/rekapan',authentification,authorizationAdmin,controller.showRekap)


module.exports=router