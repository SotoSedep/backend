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
                    res.json({message:"sukses"})
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
                res.json({message:"sukses"})
            })
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static delete(req,res){
        const{tanggalGarung}= req.body
        pembelianGarung.destroy({where:{
            tanggalGarung:tanggalGarung
        }})
        .then(data=>{
            res.json({message:"sukses"})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static listByTanggal(req,res){
        const{tanggalGarung}=req.body
        pembelianGarung.findAll({
            where:{
                tanggalGarung:tanggalGarung
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
        let data = await sq.query(`SELECT * from "pembelianGarungs" p where  EXTRACT(MONTH FROM p."tanggalGarung" + interval '7 hour') =${bulan} and EXTRACT(year FROM p."tanggalGarung" + interval '7 hour') =${tahun}`)
        res.json({message:"sukses",data:data[0]})
    }
}

module.exports=Controller