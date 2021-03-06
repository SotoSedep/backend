const controller = require('../controller/karyawanController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')

router.post('/register',authentification,authorizationAdmin,controller.register)
router.post('/login',controller.login)
router.get('/profile/:id',authentification,controller.profile)
// router.get('/profil',authentification,controller.profil)
router.post('/update/:id',authentification,controller.update)
router.delete('/delete/:id',authentification,authorizationAdmin,controller.delete)
router.get('/all',authentification,authorizationAdmin,controller.all)


module.exports=router