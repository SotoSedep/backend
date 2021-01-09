const controller = require('../controller/karyawanController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',controller.register)
router.post('/login',controller.login)
router.get('/profile/:id',controller.profile)
// router.get('/profil',authentification,controller.profil)
router.post('/update/:id',authentification,controller.update)
router.delete('/delete/:id',controller.delete)


module.exports=router