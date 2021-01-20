const rekap = require('../model/rekapModel')
const nota= require('../model/notaModel')
const temporary = require('../model/temporaryModel')
const menu = require('../model/menuModel')
const meja = require('../model/mejaModel')
const {Op} = require('sequelize')
const moment = require('moment')



class Controller{

    // static register(req, res){
    //     const {notaId,namaMenu,harga,jumlah}= req.body
    //     const totalHarga= harga*jumlah
    //     rekap.create({notaId:notaId,namaMenu:namaMenu,jumlah:jumlah,totalHarga:totalHarga}, {returning: true}).then(respon =>{
    //     res.json(respon)
    //      })
    //     .catch(err=>{
    //     res.json(err)
    //     })
        
    //   }

    static async screening(req,res){
        const{mejaId}=req.body

        nota.findAll({
            where:{
                mejaId:mejaId
            }
        })
        .then(x=>{
           
           const nomorNota=`meja${mejaId}#${x.length}`
            temporary.findAll({
                include:[menu,meja],
                where:{
                    mejaId:mejaId,
                    status:0
                }
            })
            .then(data=>{
                nota.findAll({
                    where:{
                        nomorNota:nomorNota
                    }
                }).then(data2=>{
                    if(data2.length){
                        res.json({message :"data sudah ada"})
                
                    }
                    else{
                    //    console.log(data[1].dataValues)
                        nota.create({nomorNota:nomorNota,nomorMeja:data[0].dataValues.meja.dataValues.nomorMeja,atasNama:data[0].atasNama}, {returning: true})
                        .then(respon =>{
                            for(let i = 0;i<data.length;i++){
                                rekap.create({notumId:respon.dataValues.id,namaMenu:data[i].dataValues.menu.dataValues.namaMenu,jumlah:data[i].jumlah,totalHarga:data[i].totalHarga}, {returning: true})
                            }
                         })
                         .then(respon =>{
                                    
                            temporary.destroy({
                                where : {
                                    mejaId: mejaId
                                }
                            }).then(respon=>{
                                res.json(`sukses`)   
                            })
                            })
                    }
                })
                
    
            })
            
        })
        .catch(err=>{
            res.json(err)
        })

        
    }

    //   static async screening2(req,res){
       
    //     for(let i = 0;i<req.body.length;i++){
    //        req.body[i].totalHarga= await req.body[i].harga * req.body[i].jumlah
    //     }
    //         rekap.bulkCreate(req.body,{returning:true})
    //     .then(hasil=>{
    //         res.json('INPUT DATA SUKSES')
    //     })
    // }
    
    static list(req,res){
        const{id}=req.params
        rekap.findAll({
            
            where:{
                id :id
            }
        },{returning: true})
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static bulanan(req,res){
        const{bulan,tahun}=req.body
        const awal = `${tahun}-${bulan}-1`
        const akhir = `${tahun}-${bulan}-31`
        rekap.findAll({
        
            where:{
                    createdAt: {
                        [Op.between]: [`${awal} 00:00:00`, `${akhir} 23:59:59`]
                    }
                  
            }
        },{returning: true})
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static listShift1(req,res){
        const{tanggal}=req.body
        rekap.findAll({
        
            where:{
                    createdAt: {
                      [Op.between]: [`${tanggal} 06:00:01`, `${tanggal} 14:00:00`]
                    }
                  
            }
        },{returning: true})
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static listShift2(req,res){
        const{tanggal}=req.body
        console.log(tanggal)
        rekap.findAll({
        
            where:{
                    createdAt: {
                      [Op.between]: [`${tanggal} 14:00:01`, `${tanggal} 22:00:00`]
                    }
                  
            }
        },{returning: true})
        .then(respon=>{
            res.json({respon})
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static listShift3(req,res){
        const{tanggal}=req.body;
        const a = moment(tanggal); 
        const b = a.add(1, 'd'); 
        const c = b.format('YYYY-MM-DD')
        rekap.findAll({
        
            where:{
                    createdAt: {
                      [Op.between]: [`${tanggal} 22:00:01`, `${c} 06:00:00`]
                    }
                  
            }
        },{returning: true})
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