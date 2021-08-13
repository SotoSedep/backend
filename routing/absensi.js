const controller = require('../controller/absensiController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')


router.post('/register',authentification,authorizationAdmin,controller.register)
router.post('/update',authentification,authorizationAdmin,controller.update)


module.exports=router