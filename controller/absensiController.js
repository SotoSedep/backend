const absensi = require('../model/absensiModel')

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
}

module.exports = Controller