const masterPengeluaran = require('../model/masterPengeluaranModel')

class Controller{

    static register(req,res){
        const{namaPengeluaran,hargaPengeluaran}= req.body
        masterPengeluaran.create({namaPengeluaran,hargaPengeluaran})
        .then(respon=>{
            res.json({respon})
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static update(req,res){
    const{id,namaPengeluaran,hargaPengeluaran}= req.body
    masterPengeluaran.update({namaPengeluaran,hargaPengeluaran},{where:{
        id:id
    }})
    .then(respon=>{
        res.json({respon})
        
    })
    .catch(err=>{
        res.json(err)
    })
    }

    static list(req,res){
        masterPengeluaran.findAll({})
        .then(respon=>{
            res.json({respon})
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static delete(req,res){
        const {id}= req.body
        masterPengeluaran.destroy({where:{
            id:id
        }})
        .then(respon=>{
            res.json({respon})
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

}

module.exports=Controller