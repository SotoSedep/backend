const controller = require('../controller/masterBarangGrafikController')
const router = require('express').Router()
const authentification= require('../middleware/authentification')
const {authorizationAdmin} = require('../middleware/authorization')


router.post('/register',authentification,authorizationAdmin,controller.register)
router.post('/update',authentification,authorizationAdmin,controller.update)
router.post('/delete',authentification,authorizationAdmin,controller.delete)
router.get('/list',authentification,authorizationAdmin,controller.list)
router.get('/detailsById/:id',authentification,authorizationAdmin,controller.detailsById)

module.exports=router