const users = require('../model/usersModel')
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')

class Controller{
    static register(req, res){
        console.log(req.body)
        const {username,password,nama,alamat,role,handphone}= req.body
        
        let encryptedPassword = bcrypt.hashPassword(password)
        users.findAll({
            where:{
                username:username
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"Username Sudah Terdaftar"})
            }
            else{
                
                users.create({username:username, password:encryptedPassword,nama:nama,alamat:alamat,role:role,handphone:handphone}, {returning: true}).then(respon =>{
                res.json(respon)
             })
             .catch(err=>{
                 res.json(err)
             })}
        })
         
      }

      static login(req,res){
        const{username,password}= req.body

        users.findAll({
            where:{
                username:username
            }
        })
        .then(data=>{
            if(data.length){
        let hasil =  bcrypt.compare(password, data[0].dataValues.password);
                if(hasil){
                    res.json({token : jwt.generateToken(data[0].dataValues)})
                }
                else{
                    res.json({message : "password salah"})
                }
            }
            else{res.json({message :"username tidak terdaftar"})}
        })
        .catch(err=>{
            res.json({message : err})
        })
    }
}






module.exports=Controller