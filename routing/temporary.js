const controller = require('../controller/temporaryController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')


router.post('/register',authentification,controller.register)
router.post('/screening',authentification,controller.screening)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
router.get('/listByJenis/:jenis',authentification,controller.listByJenis)
router.get('/listByMeja/:mejaId',authentification,controller.listByMeja)
router.delete('/delete/:id',authentification,controller.delete)
router.post('/update/:id',authentification,controller.update)


module.exports=router