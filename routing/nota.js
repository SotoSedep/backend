const controller = require('../controller/notaController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationKasir}=require('../middleware/authorization')

router.post('/register',authentification,authorizationKasir,controller.register)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
// router.delete('/delete/:id',authentification,controller.delete)
// router.post('/update/:id',authentification,controller.update)


module.exports=router