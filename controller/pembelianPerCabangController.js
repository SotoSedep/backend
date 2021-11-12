const pembelianPerCabang=require('../model/pembelianPerCabangModel')
const sq = require('../config/connection')
class Controller{

    

    static regUpdate(req,res){
        const {bulk,tanggalPerCabang,namaCabang}= req.body
        pembelianPerCabang.destroy({where:{
            tanggalPerCabang:tanggalPerCabang,
            namaCabang:namaCabang
        }})
        .then(data=>{
            pembelianPerCabang.bulkCreate(bulk)
            .then(data=>{
                res.json({message:"sukses"})
            })
        })
        .catch(err=>{
            res.json(err)
        })
    }


    static listByTanggal(req,res){
        const{tanggalPerCabang,namaCabang}=req.body
        pembelianPerCabang.findAll({
            where:{
                tanggalPerCabang:tanggalPerCabang,
                namaCabang:namaCabang
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
        const{bulan,tahun,namaCabang}=req.body
        let data = await sq.query(`SELECT * from "pembelianPerCabangs" p where  EXTRACT(MONTH FROM p."tanggalPerCabang" + interval '7 hour') =${bulan} and EXTRACT(year FROM p."tanggalPerCabang" + interval '7 hour') =${tahun} and p."namaCabang"='${namaCabang}'`)
        res.json({message:"sukses",data:data[0]})
    }
}

module.exports=Controller