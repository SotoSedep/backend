const rekap = require('../model/rekapModel')
const nota= require('../model/notaModel')


class Controller{

    static register(req, res){
        const {notaId,namaMenu,harga,jumlah}= req.body
        const totalHarga= harga*jumlah
        rekap.create({notaId:notaId,namaMenu:namaMenu,jumlah:jumlah,totalHarga:totalHarga}, {returning: true}).then(respon =>{
        res.json(respon)
         })
        .catch(err=>{
        res.json(err)
        })
        
      }

      static async screening(req,res){
       
        for(let i = 0;i<req.body.length;i++){
           req.body[i].totalHarga= await req.body[i].harga * req.body[i].jumlah
        }
            rekap.bulkCreate(req.body,{returning:true})
        .then(hasil=>{
            res.json('INPUT DATA SUKSES')
        })
    }
    
    static list(req,res){
        const{id}=req.params
        rekap.findAll({
            include:[menu],
            where:{
                id :id
            }
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }


    static all(req,res){
        
        rekap.findAll({
            sort:[['id','ASC']]
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    static update(req,res){
        const {id}=req.params
        const {notaId,namaMenu,harga,jumlah}= req.body
        
        rekap.update({
            notaId:notaId,
            totalHarga:harga*jumlah,
            namaMenu:namaMenu,
            jumlah:jumlah
            
        },{
            where :{
                id:id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })

    }

    static delete(req,res){
        const{id}= req.params
        rekap.destroy({
            where : {
                id: id
            }
        }).then(respon=>{
            res.json(`berhasil delete id : ${id}`)
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

    

    

}

module.exports=Controller