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
        const{id,tanggal,shift,namaKasir,totalKasbon}= req.body
        setoran.update({tanggal,shift,namaKasir,totalKasbon},{where:{
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
        let data = await sq.query(`select s.*,(select sum(pp."hargaPemasukan") as "totalPemasukan" from "poolPemasukans" pp where pp."setoranId"=s.id),(select sum(pp2."hargaPembelian") as "totalPembelian" from "poolPembelians" pp2 where pp2."setoranId"=s.id),(select sum(pp3."hargaPengeluaran") as "totalPengeluaran" from "poolPengeluarans" pp3 where pp3."setoranId"=s.id) from setorans s  where EXTRACT(MONTH FROM tanggal + interval '7 hour') =${bulan} and EXTRACT(year FROM tanggal + interval '7 hour') = ${tahun} group by s.id order by s.id `)
        res.json({data:data[0]})
    }
    static async listHarian(req,res){
        const {tanggal,bulan,tahun}= req.params
        // console.log(tanggal,bulan,tahun)
        let data = await sq.query(`select s.*,(select sum(pp."hargaPemasukan") as "totalPemasukan" from "poolPemasukans" pp where pp."setoranId"=s.id),(select sum(pp2."hargaPembelian") as "totalPembelian" from "poolPembelians" pp2 where pp2."setoranId"=s.id),(select sum(pp3."hargaPengeluaran") as "totalPengeluaran" from "poolPengeluarans" pp3 where pp3."setoranId"=s.id) from setorans s  where EXTRACT(MONTH FROM tanggal + interval '7 hour') = ${bulan} and EXTRACT(year FROM tanggal + interval '7 hour') = ${tahun} and  EXTRACT(day FROM tanggal + interval '7 hour') = ${tanggal} group by s.id order by s.id `)
        res.json({data:data[0]})
    }

    static async listHarian2(req,res){
        // const {tanggal,bulan,tahun}= req.body
        // console.log(tanggal,bulan,tahun)
        // console.log("aye")
        // let data = await sq.query(`select * from setorans s  `)
        // res.json({data:data[0]})
    }

    static  detailsSetoranById(req,res){
        const {id}= req.params
        setoran.findAll({where:{
            id:id
        }})
        .then(data=>{
            res.json({message:"sukses",data:data})
        })
        .catch(err=>{
            res.json(err)
        })
    }

}

module.exports=Controller