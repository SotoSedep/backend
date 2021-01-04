const nota = require('../model/notaModel')




class Controller{

    static register(req, res){
        const {nomorNota,mejaId,atasNama}= req.body
        nota.findAll({
            where:{
                nomorNota:nomorNota
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                nota.create({nomorNota:nomorNota,mejaId:mejaId,atasNama:atasNama}, {returning: true}).then(respon =>{
                    res.json(respon)
                 })
                 .catch(err=>{
                     res.json(err)
                 })
            }
        })
         
        
      }
    
    static list(req,res){
        const{id}=req.params
        nota.findAll({
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
        
        nota.findAll({
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
        const {nomorNota,mejaId,atasNama}= req.body
        
        nota.update({
            nomorNota:nomorNota,
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
        nota.destroy({
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