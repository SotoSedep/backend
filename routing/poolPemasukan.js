const controller = require('../controller/poolPemasukanController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',authentification,controller.register)
router.get('/listBySetoranId/:setoranId',authentification,controller.listBySetoranId)
router.post('/update',authentification,controller.update)
router.post('/delete',authentification,controller.delete)



module.exports=router