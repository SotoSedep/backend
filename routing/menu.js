const controller = require('../controller/menuController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')
const {authorizationWaitress}= require('../middleware/authorization')

router.post('/register',authentification,authorizationAdmin,controller.register)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
router.get('/listByJenis/:jenis',authentification,controller.listByJenis,authorizationWaitress)
router.delete('/delete/:id',authentification,authorizationAdmin,controller.delete)
router.post('/update/:id',authentification,authorizationAdmin,controller.update)


module.exports=router