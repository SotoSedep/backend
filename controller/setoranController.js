const setoran = require('../model/setoranModel')
const sq = require('../config/connection')

class Controller{

    static register(req,res){
        const{tanggal,shift,namaKasir}= req.body
        setoran.findAll({where:{
            tanggal:tanggal,
            shift:shift
        }})
        .then(hasil=>{
            if(hasil.length){
                res.json("data sudah ada")
            }
            else{
                setoran.create({tanggal,shift,namaKasir})
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
        const{id,tanggal,shift,namaKasir}= req.body
        setoran.update({tanggal,shift,namaKasir},{where:{
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
        let data = await sq.query(`select s.*,sum(pp."hargaPemasukan") as "totalPemasukan", sum(pp2."hargaPembelian") as "totalPembelian",sum(pp3."hargaPengeluaran") as "totalPengeluaran" from setorans s join "poolPemasukans" pp on s.id = pp."setoranId" join "poolPembelians" pp2 on pp2."setoranId" =s.id join "poolPengeluarans" pp3  on pp3."setoranId" =s.id where EXTRACT(MONTH FROM tanggal) =${bulan
        } and EXTRACT(year FROM tanggal) = ${tahun} group by s.id order by s.id `)
        res.json({data:data[0]})
    }

}

module.exports=Controller