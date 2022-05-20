const poolBarangGrafik= require('../model/poolBarangGrafikModel')
const { QueryTypes } = require('sequelize');
const sq = require('../config/connection');
const s = {type:QueryTypes.SELECT}

class Controller{

    static register(req,res){
        const{shift,jumlah,masterBarangGrafikId,tanggal}=req.body
        poolBarangGrafik.create({shift,jumlah,masterBarangGrafikId,tanggal})
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses"})
        })
        .catch(error=>{
	    console.log(req.body)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static update(req,res){
        const{shift,jumlah,masterBarangGrafikId,tanggal,id}=req.body
        poolBarangGrafik.update({shift,jumlah,masterBarangGrafikId,tanggal},{where:{
            id
        }})
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses"})
        })
        .catch(error=>{
	    console.log(req.body)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })
    }

    static delete(req,res){
        const{id}= req.body
        poolBarangGrafik.destroy({where:{
            id
        }})
        .then(data=>{
            res.status(200).json({ status: 200, message: "sukses", id: data.id})
        })
        .catch(error=>{
	    console.log(req.body)
            res.status(500).json({ status: 500, message: "gagal", data: error})
        })

        
    }

    static async listPerbulan(req,res){
        const{bulan,tahun}= req.params
        try {
            let data = await sq.query(`select date_part('day',pbg.tanggal) as tanggal ,mbg."namaBarang"  ,sum(pbg.jumlah),mbg.id as barang_id  from "poolBarangGrafiks" pbg 
            join "masterBarangGrafiks" mbg on mbg.id = pbg."masterBarangGrafikId" 
            where date_part('month',pbg.tanggal)= ${bulan} and date_part('year',pbg.tanggal)= ${tahun}
            group by date_part('day',pbg.tanggal),mbg.id  order by tanggal`,s)

            let hasilnya=[]
            for(let i=0;i<data.length;i++){
                let ada = false
                for(let j=0;j<hasilnya.length;j++){
                    if(data[i].tanggal==hasilnya[j].tanggal){
                        ada=true;
                        hasilnya[j].barangnya.push({"barang_id":data[i].barang_id,"sum":data[i].sum,"namaBarang":data[i].namaBarang})
                    }
                }
                if(ada==false){
                    hasilnya.push({"tanggal":data[i].tanggal,barangnya:[{"barang_id":data[i].barang_id,"sum":data[i].sum,"namaBarang":data[i].namaBarang}]})
                }
            }

            res.status(200).json({ status: 200, message: "sukses", hasilnya})
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

    static async listPertahun(req,res){
        const{tahun}= req.params
        try {
            let data = await sq.query(`select date_part('month',pbg.tanggal) as bulan ,mbg."namaBarang"  ,sum(pbg.jumlah),mbg.id as barang_id  from "poolBarangGrafiks" pbg 
            join "masterBarangGrafiks" mbg on mbg.id = pbg."masterBarangGrafikId" 
            where  date_part('year',pbg.tanggal)= ${tahun}
            group by date_part('month',pbg.tanggal),mbg.id  order by bulan`,s)

            let hasilnya=[]
            for(let i=0;i<data.length;i++){
                let ada = false
                for(let j=0;j<hasilnya.length;j++){
                    if(data[i].bulan==hasilnya[j].bulan){
                        ada=true;
                        hasilnya[j].barangnya.push({"barang_id":data[i].barang_id,"sum":data[i].sum,"namaBarang":data[i].namaBarang})
                    }
                }
                if(ada==false){
                    hasilnya.push({"bulan":data[i].bulan,barangnya:[{"barang_id":data[i].barang_id,"sum":data[i].sum,"namaBarang":data[i].namaBarang}]})
                }
            }

            res.status(200).json({ status: 200, message: "sukses", hasilnya})
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 500, message: "gagal", data: error})
        }
    }

}

module.exports=Controller