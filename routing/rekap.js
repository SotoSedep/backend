const controller = require('../controller/menuController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')


router.post('/register',authentification,controller.register)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
router.get('/listByJenis/:jenis',authentification,controller.listByJenis)
router.delete('/delete/:id',authentification,controller.delete)
router.post('/update/:id',authentification,controller.update)


module.exports=router