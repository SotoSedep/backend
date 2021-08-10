const rekapKaryawan=require('../model/rekapKaryawanModel')
const sq = require('../config/connection')
class Controller{

    static register(req,res){
        const {bulk}= req.body
        rekapKaryawan.findAll({where:{
            bulan : bulk[0].bulan,
            tahun : bulk[0].tahun
        }})
        .then(hasil=>{
            if(hasil.length){
                res.json("rekap sudah ada")
            }
            else{
                rekapKaryawan.bulkCreate(bulk)
                .then(data=>{
                    res.json(data)
                })
            }
        })
       
        .catch(err=>{
            res.json(err)
        })
    }

    static async listRekap(req,res){
        let data = await sq.query('select * from "rekapKaryawans" rk join karyawans k on rk."karyawanId"= k.id ')
        res.json(data[0])
    }

    static update(req,res){
        const{bulk}= req.body
        console.log(bulk[0].bulan,bulk[0].tahun)
        rekapKaryawan.destroy({where:{
            bulan : bulk[0].bulan,
            tahun : bulk[0].tahun
        }})
        .then(data=>{
            rekapKaryawan.bulkCreate(bulk)
            .then(data=>{
                res.json(data)
            })
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static delete(req,res){
        const{bulan,tahun}= req.body
        rekapKaryawan.destroy({where:{
            bulan : bulan,
            tahun : tahun
        }})
        .then(respon=>{
            res.json({message:"sukses"})
          
        })
        .catch(err=>{
            res.json(err)
        })
    }
}

module.exports = Controller