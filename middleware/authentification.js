const {verifyToken} = require('../helper/jwt')
const karyawan = require('../model/karyawanModel')

function authentification(req,res,next){
    
    
 const decode = verifyToken(req.headers.accesstoken)
   karyawan.findAll({
        where:{
            password:decode.password
        }
    })
    .then(data=>{
        if(data){ 
            // req.dataKaryawan=decode
            next()
        }
        else{
            res.json({status : 400,message :"anda belum login" })
        }
    })
    .catch(err=>{
        next(err)
        
    })
}

module.exports = authentification
