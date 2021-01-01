const temporary = require('../model/temporaryModel')
const menu= require('../model/menuModel')


class Controller{

    static register(req, res){
        const {menuId,karyawanId,mejaId,harga,jenis,jumlah,atasNama}= req.body
        const totalHarga= harga*jumlah
        temporary.create({menuId:menuId,karyawanId:karyawanId,totalHarga:totalHarga,jenis:jenis,mejaId:mejaId,jumlah:jumlah,atasNama:atasNama}, {returning: true}).then(respon =>{
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
            temporary.bulkCreate(req.body,{returning:true})
        .then(hasil=>{
            res.json('INPUT DATA SUKSES')
        })
    }
    
    static list(req,res){
        const{id}=req.params
        temporary.findAll({
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

    static listByMeja(req,res){
        const{mejaId}=req.params
        temporary.findAll({
            include:[menu],
            where:{
                mejaId:mejaId,
                status:0
            }
        })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }


    static listByJenis(req,res){
        const{jenis}=req.params
        temporary.findAll({
            include:[menu],
            where:{
                jenis:jenis,
                status:0
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
        
        temporary.findAll({
            sort:[['namaMenu','ASC']]
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
        const {menuId,harga,jenis,mejaId,jumlah,atasNama}= req.body
        
        temporary.update({
            menuId:menuId,
            totalHarga:harga*jumlah,
            jenis:jenis,
            mejaId:mejaId,
            atasNama:atasNama
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
        temporary.destroy({
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

    // static history(req,res){

    //     makanan.findAll(
    //     { 
    //         include:[{model:pesanan,
    //             required:false,
    //         where:{
    //             karyawanId:req.dataUser.id,     
    //         }}]
            
    //     })
    //     .then(respon=>{
    //         res.json({respon})
    //     })
    //     .catch(err=>{
    //         res.json(err)
    //     })
    // }

    

}

module.exports=Controller