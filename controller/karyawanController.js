const karyawan = require('../model/karyawanModel')
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')
const { Op } = require("sequelize")

function createAdmin() {
    let adminpass = bcrypt.hashPassword("soto1234")
    karyawan.findOrCreate({

        where: {
            username: "admin"
        },
        defaults: {
            password: adminpass,
            role : "admin"
        }
    })
}

createAdmin()

class Controller{
    
    static register(req, res){
        console.log(req.body)
        const {username,password,nama,alamat,role,handphone}= req.body
        
        let encryptedPassword = bcrypt.hashPassword(password)
        karyawan.findAll({
            where:{
                username:username
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"Username Sudah Terdaftar"})
            }
            else{
                
                karyawan.create({username:username, password:encryptedPassword,nama:nama,alamat:alamat,role:role,handphone:handphone}, {returning: true}).then(respon =>{
                res.json(respon)
             })
             .catch(err=>{
                 res.json(err)
             })}
        })
         
      }

      static login(req,res){
        const{username,password}= req.body
        karyawan.findAll({
            where:{
                username:username
            }
        })
        .then(data=>{
            if(data.length){
        let hasil =  bcrypt.compare(password, data[0].dataValues.password);
                if(hasil){
                    res.json([{token : jwt.generateToken(data[0].dataValues)},{id:data[0].id},{role:data[0].role}])
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

    static profile(req,res){
        const {id} = req.params
        karyawan.findAll({
            where:{
                id :id
            }
        },{returning:true})
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    // static profil(req,res){
    //     const {id} = req.dataKaryawan
    //     karyawan.findAll({
    //         where:{
    //             id :id
    //         }
    //     },{returning:true})
    //     .then(respon=>{
    //         res.json({respon})
    //     })
    //     .catch(err=>{
    //         res.json(err)
    //     })
    // }

    static all(req,res){
        
        karyawan.findAll({
            where:{
                role: {
                    [Op.or]: ["waitress", "kasir"]
                }
            }
        },{returning:true})
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static update(req,res){
        const {id} = req.params
        const {password,nama,alamat,role,handphone}= req.body
        
        karyawan.update({
            password:password,
            nama:nama,
            alamat:alamat,
            handphone:handphone,
            role:role

        },{
            where :{
                id:id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })

    }

    static delete(req,res){
        const{id}= req.params
        karyawan.destroy({
            where : {
                id: id
            }
        }).then(respon=>{
            res.json(`berhasil delete id : ${id}`)
            
        })
        .catch(err=>{
            res.json(err)
        })
    }
}






module.exports=Controller