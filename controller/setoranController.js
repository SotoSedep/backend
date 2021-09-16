const setoran = require('../model/setoranModel')
const sq = require('../config/connection')

class Controller{

    static register(req,res){
        const{tanggal,shift,pendapatan,pengeluaran,setor,namaKasir}= req.body
        setoran.findAll({where:{
            tanggal:tanggal,
            shift:shift
        }})
        .then(hasil=>{
            if(hasil.length){
                res.json("data sudah ada")
            }
            else{
                setoran.create({tanggal,shift,pendapatan,pengeluaran,setor,namaKasir})
                .then(data=>{
                    res.json("sukses")
                })
            }
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static update(req,res){
        const{id,tanggal,shift,pendapatan,pengeluaran,setor,namaKasir}= req.body
        setoran.update({tanggal,shift,pendapatan,pengeluaran,setor,namaKasir},{where:{
            id:id
        }})
        .then(data=>{
            res.json({message:"sukses"})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static delete(req,res){
        const{id}=req.body
        setoran.destroy({where:{
            id:id
        }})
        .then(data=>{
            res.json({message:"sukses"})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static async listBulanan(req,res){
        const {bulan,tahun}= req.params
        let data = await sq.query(`select * from setorans s where EXTRACT(MONTH FROM tanggal) =${bulan} and EXTRACT(year FROM tanggal) = ${tahun} order by s."tanggal"`)
        res.json({data:data[0]})
    }
}

module.exports=Controller