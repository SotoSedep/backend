const temporary = require('../model/temporaryModel')
const menu= require('../model/menuModel')
const kirimKasir = require('../app')

class Controller{

    static register(req, res){
        const {menuId,karyawanId,mejaId,harga,jenis,jumlah,atasNama,keterangan}= req.body
        const totalHarga= harga*jumlah
        temporary.create({menuId:menuId,karyawanId:karyawanId,totalHarga:totalHarga,jenis:jenis,mejaId:mejaId,jumlah:jumlah,atasNama:atasNama,keterangan:keterangan}, {returning: true}).then(respon =>{
        res.json(respon)
         })
        .catch(err=>{
        res.json(err)
        })
        
      }

      static async screening(req,res){
       console.log(req.body);
        for(let i = 0;i<req.body.length;i++){
           req.body[i].totalHarga= await req.body[i].harga * req.body[i].jumlah
        }
            temporary.bulkCreate(req.body,{returning:true})
        .then(hasil=>{
            kirimKasir.kirimKasir()
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
            console.log(respon, "ini respon")
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

    static dashboardKasir(req,res){
        
        temporary.aggregate('mejaId', 'DISTINCT', { plain: false })
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    static update(req,res){
        const {id}=req.params
        const {status}= req.body
       
        temporary.update({
    
            status:status
        },{
            where :{
                id:id
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            kirimKasir.kirimKasir()
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