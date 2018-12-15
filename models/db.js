const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/data', {useNewUrlParser : true}, (err) => {
    if (!err) { console.log('Koneksi Dengan MongoDB Sukses.') }
    else { console.log('Koneksi Dengan MongoDB Gagal :' + err) }
});

require('./anggota.model');