const controller = require('../controller/menuController')
const router = require('express').Router()

router.post('/register',controller.register)
router.get('/list/:id',controller.list)
router.get('/all',controller.all)
router.get('/listByJenis/:jenis',controller.listByJenis)
router.delete('/delete/:id',controller.delete)
router.post('/update/:id',controller.update)


module.exports=router