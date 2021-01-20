const {verifyToken} = require('../helper/jwt')
const karyawan = require('../model/karyawanModel')

function authorizationAdmin(req,res,next){
    
    
 const decode = verifyToken(req.headers.accesstoken)
 karyawan.findAll({
        where:{
            password:decode.password
        }
    })
    .then(data=>{   
        if(data[0].dataValues.role=="admin"){ 
            next()
        }
        else{
            res.json({status : 400,message :"anda bukan admin" })
        }
    })
    .catch(err=>{
        next(err)
        
    })
}

function authorizationKasir(req,res,next){
    
    // console.log(req.headers.accesstoken);
    const decode = verifyToken(req.headers.accesstoken)
    console.log(decode)
    karyawan.findAll({
           where:{
               password:decode.password
           }
       })
       .then(data=>{   
           if(data[0].dataValues.role=="kasir"){ 
               next()
           }
           else{
               res.json({status : 400,message :"anda bukan kasir" })
           }
       })
       .catch(err=>{
           next(err)
           
       })
   }

   function authorizationWaitress(req,res,next){
    
    
    const decode = verifyToken(req.headers.accesstoken)
    karyawan.findAll({
           where:{
               password:decode.password
           }
       })
       .then(data=>{   
           if(data[0].dataValues.role=="waitress"){ 
               next()
           }
           else{
               res.json({status : 400,message :"anda bukan waitress" })
           }
       })
       .catch(err=>{
           next(err)
           
       })
   }

module.exports = {authorizationAdmin,authorizationKasir,authorizationWaitress}
