const mongoose = require('mongoose');
var anggotaSchema = new mongoose.Schema({
    nama : {
        type : String,
        required : "Nama harus diisi!"
    },
    email : {
        type : String,
        required : "Email harus diisi!"
    },
    hp : {
        type : String
    },
});

//Validasi email
anggotaSchema.path('email').validate((val) =>{
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(val).toLowerCase());
}, 'Email salah.');
mongoose.model('Anggota',anggotaSchema);