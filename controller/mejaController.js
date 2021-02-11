const meja = require('../model/mejaModel')




class Controller{

    static register(req, res){
        const {nomorMeja,flagging}= req.body
        meja.findAll({
            where:{
                nomorMeja:nomorMeja,
                
            }
        }).then(data=>{
            if(data.length){
                res.json({message :"data sudah ada"})
            }
            else{
                meja.create({nomorMeja:nomorMeja,flagging:flagging}, {returning: true}).then(respon =>{
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
        meja.findAll({
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
         meja.findAll({
            order:[['id','ASC']]
        })
        .then(respon=>{
            // console.log(respon, " ini respon")
            let x = []
            let y = {}

            for(let i=0;i<respon.length;i++){
                 y[respon[i].id]=  {"flagging":respon[i].flagging,"nomorMeja":respon[i].nomorMeja,"id":respon[i].id}
               x.push(y)
               y={}
            }

            res.json({x})
        })
        .catch(err=>{
            res.json(err)
        })
    }
    
    static update(req,res){
        const {id}=req.params
        const {nomorMeja,flagging}= req.body
        
        meja.update({
            nomorMeja:nomorMeja,flagging:flagging
        },{
            where :{
                id:id,
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
        meja.destroy({
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