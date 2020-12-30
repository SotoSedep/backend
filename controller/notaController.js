const nota = require('../model/notaModel')




class Controller{

    static register(req, res){
        const {nomorNota,nomorMeja,atasNama}= req.body
        nota.findAll({
            where:{
                nomorNota:nomorNota
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                nota.create({nomorNota:nomorNota,nomorMeja:nomorMeja,atasNama:atasNama}, {returning: true}).then(respon =>{
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
        const {nomorNota,nomorMeja,atasNama}= req.body
        
        nota.update({
            nomorNota:nomorNota,
            nomorMeja:nomorMeja,
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