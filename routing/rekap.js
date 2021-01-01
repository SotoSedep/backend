const controller = require('../controller/rekapController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')


// router.post('/register',authentification,controller.register)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
router.get('/listShift1',authentification,controller.listShift1)
router.delete('/delete/:id',authentification,controller.delete)
router.post('/update/:id',authentification,controller.update)
router.post('/screening',authentification,controller.screening)


module.exports=router