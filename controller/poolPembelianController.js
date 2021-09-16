const poolPembelian = require("../model/poolPembelianModel");


class Controller{

    /*
bulk:[
    {
        setoranId:1,
        namaPembelian:"alfamart",
        hargaPembelian:100000

    },
     {
        setoranId:1,
        namaPembelian:"kecap ABC 200ml",
        hargaPembelian:23000

    }
]
    */

    static register(req,res){
        const{bulk}= req.body
        poolPembelian.create(bulk)
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
        
    }

}

module.exports=Controller