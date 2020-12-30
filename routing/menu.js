const { authenticate } = require('../config/connection')
const controller = require('../controller/menuController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',authentification,authorizationAdmin,controller.register)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
router.get('/listByJenis/:jenis',authentification,controller.listByJenis)
router.delete('/delete/:id',authentification,controller.delete)
router.post('/update/:id',authentification,controller.update)


module.exports=router