const router = require('express').Router()
const menu = require('./menu')
const temporary = require('./temporary')
const karyawan = require('./karyawan')
const meja = require('./meja')
const nota = require('./nota')
const rekap = require('./rekap')
const rekapKaryawan=require('./rekapKaryawan')
const pembelian = require('./pembelian')
const setoran=require('./setoran')
const absensi=require('./absensi')
const rekapGaji=require('./rekapGaji')
const masterBarangBeli= require('./masterBarangBeli')
const masterPengeluaran=require('./masterPengeluaran')
const poolPembelian = require('./poolPembelian')
const poolPengeluaran = require('./poolPengeluaran')
const poolPemasukan = require('./poolPemasukan')
const pembelianGarung=require('./pembelianGarung')
const pembelianBanyumanik=require('./pembelianBanyumanik')
const pembelianPerCabang = require('./pembelianPerCabang')
const masterBarangGrafik = require('./masterBarangGrafik')
const poolBarangGrafik=require('./poolBarangGrafik')

router.use('/menu',menu)
router.use('/temporary',temporary)
router.use('/karyawan',karyawan)
router.use('/meja',meja)
router.use('/nota',nota)
router.use('/rekap',rekap)
router.use('/rekapKaryawan',rekapKaryawan)
router.use('/pembelian',pembelian)
router.use('/setoran',setoran)
router.use('/absensi',absensi)
router.use('/rekapGaji',rekapGaji)
router.use('/masterBarangBeli',masterBarangBeli)
router.use('/masterPengeluaran',masterPengeluaran)
router.use('/poolPembelian',poolPembelian)
router.use('/poolPengeluaran',poolPengeluaran)
router.use('/poolPemasukan',poolPemasukan)
router.use('/pembelianGarung',pembelianGarung)
router.use('/pembelianBanyumanik',pembelianBanyumanik)
router.use('/pembelianPerCabang',pembelianPerCabang)
router.use('/masterBarangGrafik',masterBarangGrafik)
router.use('/poolBarangGrafik',poolBarangGrafik)

module.exports=router