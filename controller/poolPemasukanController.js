const poolPemasukan = require("../model/poolPemasukanModel");


class Controller{

    /*
bulk:[
    {
        setoranId:1,
        namaPemasukan:"soto",
        hargaPemasukan:10000000,
        jumlahPemasukan:3

    },
     {
        setoranId:1,
        namaPemasukan:"snack",
        hargaPemasukan:15000000,
        jumlahPemasukan:3

    }
]
    */

    static register(req,res){
        const{bulk}= req.body
        poolPemasukan.create(bulk)
        .then(respon=>{
            res.json({message:"sukses"}) 
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static listBySetoranId(req,res){
        const{setoranId}= req.params
        poolPemasukan.findAll({
            where:{
                setoranId:setoranId
            }
        })
        .then(data=>{
            res.json({message:"sukses",data:data}) 
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static update(req,res){
        const{id,namaPemasukan,hargaPemasukan,jumlahPemasukan}= req.body
        poolPemasukan.update({namaPemasukan,hargaPemasukan,jumlahPemasukan},{
            where:{
                id:id
            }
        })
        .then(data=>{
            res.json({message:"sukses",data:data}) 
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static delete(req,res){
        const{id}= req.body
        poolPemasukan.destroy({
            where:{
                id:id
            }
        })
        .then(data=>{
            res.json({message:"sukses"}) 
        })
        .catch(err=>{
            res.json(err)
        })
    }

}

module.exports=Controller