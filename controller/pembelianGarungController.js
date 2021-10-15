const sq = require('../config/connection')
const pembelianGarung=require('../model/pembelianGarungModel')

class Controller{

    static register(req,res){
        const {bulk}= req.body
        pembelianGarung.findAll({where:{
            tanggalGarung:bulk[0].tanggalGarung
        }})
        .then(hasil=>{
            if(hasil.length){
                res.json("data sudah ada")
            }
            else{
                pembelianGarung.bulkCreate(bulk)
                .then(data=>{
                    res.json(data)
                })
            }
        })
       
        .catch(err=>{
            res.json(err)
        })
    }

    static update(req,res){
        const {bulk}= req.body
        pembelianGarung.destroy({where:{
            tanggalGarung:bulk[0].tanggalGarung
        }})
        .then(data=>{
            pembelianGarung.bulkCreate(bulk)
            .then(data=>{
                res.json(data)
            })
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static delete(req,res){
        const{tanggal}= req.body
        pembelianGarung.destroy({where:{
            tanggal:tanggal
        }})
        .then(data=>{
            res.json("sukses")
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static listByTanggal(req,res){
        const{tanggal}=req.body
        pembelianGarung.findAll({
            where:{
                tanggal:tanggal
            }
        })
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static async listByBulanTahun(req,res){
        const{bulan,tahun}=req.body
        let data = await sq.query(`SELECT * from "tanggalGarung" where EXTRACT(MONTH FROM p."tanggalMulaiPelatihan" interval '7 hour' = ${bulan} and EXTRACT(YEAR FROM p."tanggalMulaiPelatihan" interval '7 hour' = ${tahun}`)
        res.json({message:"sukses",data})
    }
}

module.exports=Controller