const temporary = require('../model/temporaryModel')
const menu= require('../model/menuModel')
const meja = require('../model/mejaModel')
const history = require('../model/historyModel')
const kirimKasir = require('../app')
const gantiWarna = require('../app')
const sq = require('../config/connection')
const { Op } = require("sequelize");

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
        .then(data=>{
            temporary.findAll({
                include:[menu],
                where:{
                    jenis:jenis,
                    status:1
                }
            })
            .then(data2=>{
                res.json([data,data2])
            })
            
        })
        .catch(err=>{
            res.json(err)
        })
    }

    static async listMakananDanSoto(req,res){
        let data = await sq.query(`select t.id as "temporaryId",* from temporaries t join menus m on t."menuId" = m.id join mejas m2 on t."mejaId" = m2.id where (t.jenis ='makanan' or t.jenis='soto') and (flagging =1 or flagging =3) `)
        // let data2 = await sq.query(`select * from temporaries where (jenis ='makanan' or jenis='soto') and status =1`)
        let x = data[0]
        let y = []
        for(let i =0;i<x.length;i++){
            let sama = false
            for(let j =0;j<y.length;j++){
                 if(x[i]["mejaId"]==y[j]["mejaId"]){
                    y[j]["pesanan"].push({"jumlah":x[i]["jumlah"],"status":x[i]["status"],"temporaryId":x[i]["temporaryId"],"namaMenu":x[i]["namaMenu"],"mejaId":x[i]["mejaId"],"jenis":x[i]["jenis"],"keterangan":x[i]["keterangan"]})
                    sama=true
                }   
            }
            if(sama==false){
                y.push({"mejaId":x[i]["mejaId"],"karyawanId":x[i]["karyawanId"],"namaPemesan":x[i]["atasNama"],"pesanan":[{"jumlah":x[i]["jumlah"],"status":x[i]["status"],"temporaryId":x[i]["temporaryId"],"namaMenu":x[i]["namaMenu"],"mejaId":x[i]["mejaId"],"jenis":x[i]["jenis"],"keterangan":x[i]["keterangan"]}]})
            }
        }
        
       
        
        res.json({data:y})
    }

    static async listMinuman(req,res){
        let data = await sq.query(`select t.id as "temporaryId",* from temporaries t join menus m on t."menuId" = m.id join mejas m2 on t."mejaId" = m2.id where (t.jenis ='minuman') and (flagging =1 or flagging = 2)`)
        // let data2 = await sq.query(`select * from temporaries where jenis = 'minuman' and status =1`)

        let x = data[0]
        let y = []
        for(let i =0;i<x.length;i++){
            let sama = false
            for(let j =0;j<y.length;j++){
                 if(x[i]["mejaId"]==y[j]["mejaId"]){
                    y[j]["pesanan"].push({"jumlah":x[i]["jumlah"],"status":x[i]["status"],"temporaryId":x[i]["temporaryId"],"namaMenu":x[i]["namaMenu"],"mejaId":x[i]["mejaId"],"keterangan":x[i]["keterangan"]})
                    sama=true
                }   
            }
            if(sama==false){
                y.push({"mejaId":x[i]["mejaId"],"karyawanId":x[i]["karyawanId"],"namaPemesan":x[i]["atasNama"],"pesanan":[{"jumlah":x[i]["jumlah"],"status":x[i]["status"],"temporaryId":x[i]["temporaryId"],"namaMenu":x[i]["namaMenu"],"mejaId":x[i]["mejaId"],"keterangan":x[i]["keterangan"]}]})
            }
        }
        
        
        
        res.json({data:y})
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
        .then ( async respon=>{
            let x=[]
            for(let i =0;i<respon.length;i++){
               await temporary.findAll({
                    where:{
                        mejaId:respon[i].DISTINCT
                    }
                }).then(hasil=>{
                    respon[i].atasNama=hasil[0].dataValues.atasNama
                    //  x.push(hasil[0].dataValues.atasNama)
                    //  console.log(x,"????")
                    // console.log(hasil[0].dataValues.atasNama)
                })
            }
          
            res.json(respon)
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    static update(req,res){
        const {id}=req.params
        const {status,mejaId}= req.body
       
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
                where :{
                    mejaId:mejaId,
                    status:0,
                    [Op.or]: [
                        { jenis: "makanan" },
                        { jenis: 'soto' }
                      ]
                }
            })
            .then(data2=>{
                temporary.findAll({
                    where :{
                        mejaId:mejaId,
                        status:0,
                        jenis:"minuman"
                    }
                })
                .then(data3=>{
                    console.log(data2.length)
                    console.log(data3.length)
                    if(data2.length==0 && data3.length==0){
                        meja.update({
                            flagging:4
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
                    else if(data2.length==0){
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
                    else if(data3.length==0){
                        meja.update({
                            flagging:3
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
                    else{
                        res.json({message:"selesai"})
                    }
                })
            })

                })
                
        
        .catch(err=>{
            res.json({message:err})
        })

    }

    static updateMakananPerMeja(req,res){
        const {status,mejaId}= req.body
        temporary.update({
            status:status
        },{
            where :{
                mejaId:mejaId,
                [Op.or]: [
                    { jenis: "makanan" },
                    { jenis: 'soto' }
                  ]
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            kirimKasir.kirimKasir()
            temporary.findAll({
                where:{
                    mejaId:mejaId,
                    status:0,
                    jenis:"minuman"
                }
            })
            .then(data2=>{
                if(data2.length){                
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
                else{
                    meja.update({
                        flagging:4
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
            res.json({message:err})
        })

    }

    static updateMinumanPerMeja(req,res){
        const {status,mejaId}= req.body
        temporary.update({
            status:status
        },{
            where :{
                mejaId:mejaId,
                jenis:"minuman"
            },
            returning: true,
            plain:true
        })
        .then(respon=>{
            kirimKasir.kirimKasir()
            temporary.findAll({
                where:{
                    mejaId:mejaId,
                    status:0,
                    [Op.or]: [
                        { jenis: "makanan" },
                        { jenis: 'soto' }
                      ]
                }
            })
            .then(data2=>{
                if(data2.length){
                    meja.update({
                        flagging:3
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
                else{
                    meja.update({
                        flagging:4
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
            res.json({message:err})
        })

    }

    static delete(req,res){
        const {id}=req.params
        const {mejaId}= req.body
        temporary.destroy({
            where:{
                id:id
            }
            
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
               
                if(data2.length){
                   
                    res.json({data2})
                }
                else{
                    
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