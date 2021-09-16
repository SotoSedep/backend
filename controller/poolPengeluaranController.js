const poolPengeluaran = require("../model/poolPengeluaranModel");


class Controller{

    /*
bulk:[
    {
        setoranId:1,
        namaPengeluaran:"bayar listrik",
        hargaPengeluaran:100000,
        jumlahPengeluaran:1

    },
     {
        setoranId:1,
        namaPengeluaran:"bayar bon waiters A",
        hargaPengeluaran:50000,
        jumlahPengeluaran:1

    }
]
    */

    static register(req,res){
        const{bulk}= req.body
        poolPengeluaran.create(bulk)
        .then(respon=>{
            res.json({message:"sukses"}) 
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static listBySetoranId(req,res){
        const{setoranId}= req.params
        poolPengeluaran.findAll({
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
        const{id,namaPengeluaran,hargaPengeluaran,jumlahPengeluaran}= req.body
        poolPengeluaran.update({namaPengeluaran,hargaPengeluaran,jumlahPengeluaran},{
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
        poolPengeluaran.destroy({
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