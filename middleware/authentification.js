const {verifyToken} = require('../helper/jwt')
const karyawan = require('../model/karyawanModel')

function authentification(req,res,next){
    
    // console.log(req.headers.accesstoken, "auten")
 const decode = verifyToken(req.headers.accesstoken)

   karyawan.findAll({
        where:{
            id : decode.id,
            password:decode.password
        }
    })
    .then(data=>{
        console.log(data.length)
        if(data.length){ 
            
            console.log("masuk data")
            // req.dataKaryawan=decode
            next()
        }
        else{
            console.log("masuk else")
            res.json("anda belum login")
        }
    })
    .catch(err=>{
       
        next(err)
        
    })
}

module.exports = authentification
