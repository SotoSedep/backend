const controller = require('../controller/mejaController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')

router.post('/register',authentification,controller.register)
router.get('/list/:id',authentification,controller.list)
router.get('/all',authentification,controller.all)
router.delete('/delete/:id',authentification,controller.delete)
router.post('/update/:id',authentification,controller.update)


module.exports=router