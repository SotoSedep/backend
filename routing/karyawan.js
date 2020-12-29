const controller = require('../controller/karyawanController')
const router = require('express').Router()

router.post('/register',controller.register)
router.post('/login',controller.login)
router.get('/profil/:id',controller.profil)


module.exports=router