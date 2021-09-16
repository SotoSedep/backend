const controller = require('../controller/poolPembelianController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',authentification,controller.register)
router.get('/listBySetoranId/:setoranId',authentification,controller.listBySetoranId)



module.exports=router