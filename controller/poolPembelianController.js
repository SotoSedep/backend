const poolPembelian = require("../model/poolPembelianModel");


class Controller{

    /*
bulk:[
    {
        setoranId:1,
        namaPembelian:"alfamart",
        hargaPembelian:100000,
        jumlahPembelian:3

    },
     {
        setoranId:1,
        namaPembelian:"kecap ABC 200ml",
        hargaPembelian:23000,
        jumlahPembelian:3

    }
]
    */

    static register(req,res){
        const{bulk}= req.body
        poolPembelian.bulkCreate(bulk)
        .then(respon=>{
            res.json({message:"sukses"}) 
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static listBySetoranId(req,res){
        const{setoranId}= req.params
        poolPembelian.findAll({
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
        const{id,namaPembelian,hargaPembelian,jumlahPembelian}= req.body
        poolPembelian.update({namaPembelian,hargaPembelian,jumlahPembelian},{
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
        poolPembelian.destroy({
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