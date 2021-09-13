const masterBarangPembelian = require('../model/masterBarangBeliModel')

class Controller{

    static register(req,res){
        const{namaBarangPembelian,hargaBarangPembelian}= req.body
        masterBarangPembelian.create({namaBarangPembelian,hargaBarangPembelian})
        .then(respon=>{
            res.json({respon})
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static update(req,res){
    const{id,namaBarangPembelian,hargaBarangPembelian}= req.body
    masterBarangPembelian.update({namaBarangPembelian,hargaBarangPembelian},{where:{
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
        masterBarangPembelian.findAll({})
        .then(respon=>{
            res.json({respon})
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static delete(req,res){
        const {id}= req.body
        masterBarangPembelian.destroy({where:{
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