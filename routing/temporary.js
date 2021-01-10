const controller = require('../controller/temporaryController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationWaitress}= require('../middleware/authorization')
const {authorizationKasir}=require('../middleware/authorization')


router.post('/register',authentification,authorizationWaitress,controller.register)
router.post('/screening',authentification,authorizationWaitress,controller.screening)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
router.get('/listByJenis/:jenis',authentification,controller.listByJenis)
router.get('/listByMeja/:mejaId',authentification,authorizationKasir,controller.listByMeja)
// router.delete('/delete/:id',authentification,authorizationWaitress,controller.delete)
router.post('/update/:id',authentification,authorizationKasir,controller.update)


module.exports=router