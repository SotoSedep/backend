const karyawan = require('../model/karyawanModel')
const bcrypt = require('../helper/bcrypt')
const jwt = require('../helper/jwt')
const { Op } = require("sequelize")
const sq = require('../config/connection')

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
        const {username,password,nama,alamat,role,handphone,norekKaryawan,namaBank,gajiKaryawan}= req.body
        
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
                
                karyawan.create({username:username, password:encryptedPassword,nama:nama,alamat:alamat,role:role,handphone:handphone,norekKaryawan,namaBank,gajiKaryawan}, {returning: true}).then(respon =>{
                res.json(respon)
             })
             .catch(err=>{
                 res.json(err)
             })}
        })
         
      }

      static resetPassword(req,res){
          const{id}= req.body
          let passwordFosan = bcrypt.hashPassword("fosan")
          karyawan.update({password:passwordFosan},{
              where:{
                  id:id
              }
          })
          .then(data=>{
              res.json({message:"sukses"})
          })
          .catch(err=>{
              res.json({message:err})
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

    static async all(req,res){
    let data= await sq.query(`select * from "karyawans" k where k."role" <> 'admin'`)
    res.json({respon:data[0]})
        // karyawan.findAll({
        //     where:{
        //         role: {
        //             [Op.or]: ["waitress", "kasir"]
        //         }
        //     }
        // },{returning:true})
        // .then(respon=>{
        //     res.json({respon})
        // })
        // .catch(err=>{
        //     res.json(err)
        // })
    }

    static update(req,res){
        console.log(req.body)
        const {id} = req.params
        const {password,nama,alamat,role,handphone,norekKaryawan,namaBank,gajiKaryawan}= req.body
        
        karyawan.update({
            password:password,
            nama:nama,
            alamat:alamat,
            handphone:handphone,
            role:role,
            norekKaryawan,
            namaBank,gajiKaryawan

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
        const{id}= req.body
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

    static async testKaryawan(req,res){
        const{tanggal}= req.body
        let data = await sq.query(`select * from karyawans where extract(day from "createdAt" + interval '7 hour' )=19`)
  
        res.json({tanggal19:data[0]})
    }
}






module.exports=Controller