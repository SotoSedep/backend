const sq = require("../config/connection")
const rekapGaji = require("../model/rekapGajiModel")

class Controller{

    static bulkRegister(req,res){
        const{bulk}=req.body
        rekapGaji.findAll({
            where:{
                bulan:bulk[0]["bulan"],
                tahun:bulk[0]["tahun"]
            }
        })
        .then(hasil=>{
            if(hasil.length){
                res.json({message:"rekap gaji untuk bulan tersebut sudah ada"})
            }
            else{
                rekapGaji.bulkCreate(bulk)
                .then(hasil2=>{
                    res.json("sukses")
                })
            }
           
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static update(req,res){
        const {id,gajiHarian,gajiBulanan,jumlahMasuk,bulan,tanggal,cashBon}=req.body
        rekapGaji.update({gajiHarian,gajiBulanan,jumlahMasuk,bulan,tanggal,cashBon},{where:{
            id:id
        }})
        .then(hasil=>{
          res.json({message:"sukses"})
        })
        .catch(err=>{
            res.json(err)
        })
    }


    static async listByBulan(req,res){
        const{bulan,tahun}=req.params
        let data = await sq.query(`select k."nama",rk.* from "rekapGajis" rk join "karyawans" k on rk."karyawanId" = k.id where rk.bulan = ${bulan} and rk.tahun =${tahun}`)
        res.json({data:data[0]})
    }
}

module.exports = Controller