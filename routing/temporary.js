const controller = require('../controller/temporaryController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationWaitress}= require('../middleware/authorization')
const {authorizationKasir}=require('../middleware/authorization')


router.post('/register',authentification,authorizationWaitress,controller.register)
router.post('/screening',authentification,authorizationWaitress, controller.screening)
router.get('/list/:id',controller.list)
router.get('/all',authentification,controller.all)
router.get('/listByJenis/:jenis',controller.listByJenis)
router.get('/listByMeja/:mejaId',authentification,authorizationKasir,controller.listByMeja)
// router.delete('/delete/:id',authentification,authorizationWaitress,controller.delete)
router.post('/update/:id',controller.update)
router.get('/dashboardKasir',authentification,authorizationKasir,controller.dashboardKasir)
router.post('/delete/:id',controller.delete)
router.get('/listMakananDanSoto',controller.listMakananDanSoto)
router.get('/listMinuman',controller.listMinuman)
router.post('/updateMakananPerMeja',controller.updateMakananPerMeja)
router.post('/updateMinumanPerMeja',controller.updateMinumanPerMeja)


module.exports=router