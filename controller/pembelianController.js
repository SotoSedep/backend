const pembelian=require('../model/pembelianModel')

class Controller{

    static register(req,res){
        const {bulk}= req.body
        pembelian.findAll({where:{
            tanggal:bulk[0].tanggal
        }})
        .then(hasil=>{
            if(hasil.length){
                res.json("data sudah ada")
            }
            else{
                pembelian.bulkCreate(bulk)
                .then(data=>{
                    res.json(data)
                })
            }
        })
       
        .catch(err=>{
            res.json(err)
        })
    }

    static update(req,res){
        const {bulk}= req.body
        pembelian.destroy({where:{
            tanggal:bulk[0].tanggal
        }})
        .then(data=>{
            pembelian.bulkCreate(bulk)
            .then(data=>{
                res.json(data)
            })
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static delete(req,res){
        const{tanggal}= req.body
        pembelian.destroy({where:{
            tanggal:tanggal
        }})
        .then(data=>{
            res.json("sukses")
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static listByTanggal(req,res){
        const{tanggal}=req.body
        pembelian.findAll({
            where:{
                tanggal:tanggal
            }
        })
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.json(err)
        })
    }
}

module.exports=Controller