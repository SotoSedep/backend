const masterBarangGrafik= require('../model/masterBarangGrafikModel')

class Controller{

    static register(req,res){
        const{namaBarang}=req.body
        masterBarangGrafik.findAll({where:{
            namaBarang
        }})
        .then(hasil=>{
            if(hasil.length){
                res.status(200).json({ status: 201, message: "data sudah ada"})
            }
            else{
                masterBarangGrafik.create({namaBarang})
                .then(hasil2=>{
                    res.status(200).json({ status: 200, message: "sukses"})
                })
            }
        })
        .catch(error=>{
            console.log(req.body)
                res.status(500).json({ status: 500, message: "gagal", data: error})
            })
    }

    static update(req,res){
        const{id,namaBarang}=req.body
        masterBarangGrafik.findAll({where:{
            namaBarang
        }})
        .then(hasil=>{
            if(hasil.length){
                res.status(200).json({ status: 201, message: "data sudah ada"})
            }
            else{
                masterBarangGrafik.update({namaBarang},{
                    where:{
                        id
                    }
                })
                .then(hasil2=>{
                    res.status(200).json({ status: 200, message: "sukses"})
                })
            }
        })
        .catch(error=>{
            console.log(req.body)
                res.status(500).json({ status: 500, message: "gagal", data: error})
            })
    }

    static list(req,res){
        masterBarangGrafik.findAll()
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses", data})
        })
        .catch(error=>{
	    console.log(req.body)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static detailsById(req,res){
        const{id}= req.params
        masterBarangGrafik.findAll({where:{
            id
        }})
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses", data})
        })
        .catch(error=>{
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static delete(req,res){
        const{id}= req.body
        masterBarangGrafik.destroy({where:{
            id
        }})
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses"})
        })
        .catch(error=>{
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

}

module.exports=Controller