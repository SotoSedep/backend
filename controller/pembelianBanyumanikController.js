const sq = require('../config/connection')
const pembelianBanyumanik=require('../model/pembelianBanyumanikModel')

class Controller{

    static register(req,res){
        const {bulk}= req.body
        // console.log(bulk[0].tanggalBanyumanik)
        pembelianBanyumanik.findAll({where:{
            tanggalBanyumanik:bulk[0].tanggalBanyumanik
        }})
        .then(hasil=>{
            if(hasil.length){
                res.json("data sudah ada")
            }
            else{
                pembelianBanyumanik.bulkCreate(bulk)
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
        pembelianBanyumanik.destroy({where:{
            tanggalBanyumanik:bulk[0].tanggalBanyumanik
        }})
        .then(data=>{
            pembelianBanyumanik.bulkCreate(bulk)
            .then(data=>{
                res.json({message:"sukses"})
            })
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static delete(req,res){
        const{tanggalBanyumanik}= req.body
        pembelianBanyumanik.destroy({where:{
            tanggalBanyumanik:tanggalBanyumanik
        }})
        .then(data=>{
            res.json({message:"sukses"})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static listByTanggal(req,res){
        const{tanggalBanyumanik}=req.body
        console.log(tanggalBanyumanik)
        pembelianBanyumanik.findAll({
            where:{
                tanggalBanyumanik:tanggalBanyumanik
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
        let data = await sq.query(`SELECT * from "pembelianBanyumaniks" p where  EXTRACT(MONTH FROM p."tanggalBanyumanik" + interval '7 hour') =${bulan} and EXTRACT(year FROM p."tanggalBanyumanik" + interval '7 hour') =${tahun}`)
        res.json({message:"sukses",data:data[0]})
    }
}

module.exports=Controller