const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Anggota = mongoose.model('Anggota');
const bodyparser = require('body-parser');
router.get('/',(req,res) => {
    res.render("anggota/addOrEdit",{judul : "Tambah Anggota"});
});

router.post('/',(req,res) => {
    if(req.body._id == '')
    tambahData(req,res);
    else
    ubahData(req,res);
});

function tambahData(req,res){
    var anggota = new Anggota();
    anggota.nama = req.body.nama;
    anggota.email = req.body.email;
    anggota.hp = req.body.hp;
    anggota.save((err, doc) => {
        if(!err){
            res.redirect('anggota/list');
        }
        else {
            if (err.name == 'ValidationError' ){
             handleVaidationError(err, req.body);
                    res.render("anggota/addOrEdit",{
                        anggota: req.body
                    });
            }
            else   
            console.log('Error' + err);
        }
    });
}

function handleVaidationError(err,body){
    for(field in err.errors){
        switch (err.errors[field].path){
            case 'nama' : body['namaError'] = err.errors[field].message; break;
            case 'email' : body['emailError'] = err.errors[field].message; break;
            default: break;
        }
    }
}

function ubahData(req,res){
    Anggota.findByIdAndUpdate({_id:req.body._id},req.body, {new:true}, (err,doc) => {
        if(!err) res.redirect("anggota/list");
        else {
            if(err.name == ValidationError) {
                handleVaidationError(err,req.body);
                res.render("anggota/addOrEdit",{
                    judul : "Ubah Anggota",
                    anggota : req.body
                });
            }
            else 
            console.log('Error : ' + err);
        }
    });
}

router.get('/list', (req,res) => {
    Anggota.find((err,docs) => {
        if(!err){
            res.render("anggota/list", {
                judul : "Daftar Anggota",
                list : docs
            });
            }
            else console.log("Error : " + err);
    });
});

router.get('/:id',(req,res) =>{
    Anggota.findById(req.params.id, (err,doc) => {
        if(!err){
            res.render("anggota/addOrEdit",{
                judul : "Edit Anggota",
                anggota : doc
            });
        }
    });
});

router.get('/delete/:id',(req,res) => {
    Anggota.findOneAndDelete(req.params.id, (err,doc) => {
        if(!err){
            res.redirect("/anggota/list");
        } else {
            console.log('Error : ' + err);
        }
    });
});

module.exports = router;
