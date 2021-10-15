const absensi = require('../model/absensiModel')
const sq = require('../config/connection')

class Controller{


    /*
        bulk[
            {
                "tanggalAbsen":2021/8/8,
                "karyawanId":1,
                "absen":1,
                "absenStghHari":0,
                "gaji":20000,
                "kasbon":100000
            },
            {
                "tanggalAbsen":2021/8/8,
                "karyawanId":2,
                "absen":0,
                "absenStghHari":0,
                "gaji":0,
                "kasbon":0
            }
        ]
    */


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

    static async listByTanggal(req,res){
        const {tanggal,bulan,tahun}= req.body
        let searchTanggal=""
        let searchBulan =""
        let searchTahun=""
      
        if(tanggal){
            searchTanggal= `and EXTRACT(DAY FROM a."tanggalAbsen"+ interval '7 hour') =${tanggal}`
        }
        if(bulan){
            searchBulan= `and EXTRACT(MONTH FROM a."tanggalAbsen"+ interval '7 hour') =${bulan}`
        }
        if(tahun){
            searchTahun= `and EXTRACT(YEAR FROM a."tanggalAbsen"+ interval '7 hour') =${tahun}`
        }

        let data = await sq.query(`select k.id ,k.nama,k."role" ,k.alamat ,k.handphone,k."gajiKaryawan" ,sum(absen) as "jumlahMasuk" from absensis a join karyawans k on a."karyawanId" = k.id  where id <> 0 ${searchTanggal} ${searchBulan} ${searchTahun}`)
        res.json({data:data[0]})
    }

    static async absensiByKaryawanId(req,res){
        const{karyawanId,bulan,tahun}=req.params
        let data = await sq.query(`select k.nama ,a."tanggalAbsen" ,a."kasbon",a."absenStghHari" ,a.absen from karyawans k join absensis a ON k.id = a."karyawanId" where k.id= ${karyawanId} and  EXTRACT(MONTH FROM a."tanggalAbsen"+ interval '7 hour') = ${bulan} and EXTRACT(YEAR FROM a."tanggalAbsen" + interval '7 hour') =${tahun} group by k.id,a.id`)
        res.json({data:data[0]})
    }

    static async rekapKaryawanBulanan(req,res){
        const{bulan,tahun} = req.body
       
        let data = await sq.query(`select k2.id as "karyawanId",k2.nama,k2.handphone ,k2."role" ,k2."norekKaryawan",k2."namaBank",sum(absen) as "totalAbsen", sum("absenStghHari") as "totalStghHari",sum(gaji) as "totalGaji", sum(kasbon) as "totalKasbon" from absensis a join karyawans k2 on a."karyawanId" = k2.id where EXTRACT(MONTH FROM a."tanggalAbsen" + interval '7 hour') = ${bulan} and EXTRACT(YEAR FROM a."tanggalAbsen" + interval '7 hour') = ${tahun} group by k2.id `)
        res.json({data:data[0]})
    }
}

module.exports = Controller