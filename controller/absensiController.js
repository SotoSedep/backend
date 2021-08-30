const absensi = require('../model/absensiModel')
const sq = require('../config/connection')

class Controller{

    static register(req,res){
        const {bulk}= req.body
       absensi.findAll({where:{
           tanggalAbsen:bulk[0].tanggalAbsen
       }})
       .then(hasil=>{
           if(hasil.length){
               res.json({message:"data sudah ada"})
           }
           else{
            absensi.bulkCreate(bulk)
            .then(data=>{
                res.json("sukses")
            })
           
           }
       })
       .catch(err=>{
        res.json("err")
    })
    }

    static update(req,res){
        const{bulk}= req.body
        absensi.destroy({where:{
            tanggalAbsen:bulk[0].tanggalAbsen
        }})
        .then(hasil=>{
            absensi.bulkCreate(bulk)
            .then(data=>{
                res.json({message:"sukses"})
            })
        })
        .catch(err=>{
            res.json("err")
        })
    }

    static async listByBulan(req,res){
        const {bulan}= req.params
        let data = await sq.query(`select a.id as "absensiId",* from absensis a join karyawans k on a."karyawanId" = k.id  where EXTRACT(MONTH FROM a."tanggalAbsen") =${bulan}`)
        res.json({data:data[0]})
    }
}

module.exports = Controller