const temporary = require('../model/temporaryModel')
const menu= require('../model/menuModel')
const meja = require('../model/mejaModel')
const history = require('../model/historyModel')
const kirimKasir = require('../app')
const gantiWarna = require('../app')
const sequelize = require('sequelize')

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
      
        for(let i = 0;i<req.body.length;i++){
           req.body[i].totalHarga= await req.body[i].harga * req.body[i].jumlah
        }
            temporary.bulkCreate(req.body,{returning:true})
        .then(hasil=>{
            kirimKasir.kirimKasir()
            meja.update({
                flagging:1
            },{
                where :{
                    id:req.body[0].mejaId,
                }
            })
            .then(respon=>{
                history.create({karyawanId:req.body[0].karyawanId,mejaId:req.body[0].mejaId})
                .then(respon2=>{
                 gantiWarna.gantiWarna()
                 res.json({message:"INPUT DATA SUKSES"})
                })
            })
        })
        .catch(err=>{
            res.json(err)
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
            kirimKasir.kirimKasir()
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
            order:[['namaMenu','ASC']]
        })
        .then(respon=>{
            res.json({respon})
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static dashboardKasir(req,res){

        // temporary.findAll({
        //     attributes: [
        //         [sequelize.fn('DISTINCT', sequelize.col('mejaId')) ,'mejaId'],
        //     ],
        //     // include: [ [meja]],
        // })
        //  .then(respon=>{
        //     res.json({respon})
        // })
        // .catch(err=>{
        //     res.json(err)
        // })
        
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
        const {status,mejaId}= req.body
       console.log(req.body)
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
            temporary.findAll({
                where:{
                    mejaId:mejaId,
                    status:0
                }
            })
            .then(data2=>{
                console.log(data2,"<<<<<<<<< Data2")
                if(data2.length){
                    console.log("masuk if")
                    res.json({data2})
                }
                else{
                    console.log("masuk else")
                    meja.update({
                        flagging:2
                    },{
                        where :{
                            id:mejaId,
                        }
                    })
                    .then(respon=>{
                        gantiWarna.gantiWarna();
                        res.json({message:"selesai"})
                    })
                    
                    
                }
            })
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