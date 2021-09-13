const controller = require('../controller/masterBarangBeliController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',authentification,controller.register)
router.get('/list',authentification,controller.list)
router.post('/update',authentification,controller.update)
router.post('/delete',authentification,controller.delete)


module.exports=router