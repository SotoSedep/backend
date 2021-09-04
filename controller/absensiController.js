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
        const {bulan,tahun}= req.params
        let data = await sq.query(`select k.id ,k.nama,k."role" ,k.alamat ,k.handphone ,sum(absen) as "jumlahMasuk" from absensis a join karyawans k on a."karyawanId" = k.id  where EXTRACT(MONTH FROM a."tanggalAbsen") =${bulan} and EXTRACT(YEAR FROM a."tanggalAbsen") =${tahun} group by k.id`)
        res.json({data:data[0]})
    }

    static async absensiByKaryawanId(req,res){
        const{karyawanId,bulan,tahun}=req.params
        let data = await sq.query(`select k.nama ,a."tanggalAbsen" ,a.absen from karyawans k join absensis a ON k.id = a."karyawanId" where k.id= ${karyawanId} and  EXTRACT(MONTH FROM a."tanggalAbsen") = ${bulan} and EXTRACT(YEAR FROM a."tanggalAbsen") =${tahun} group by k.id,a."tanggalAbsen",a.absen order by "tanggalAbsen" `)
        res.json({data:data[0]})
    }
}

module.exports = Controller