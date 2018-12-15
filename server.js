require('./models/db');

const express = require('express');
const anggotaController = require('./controllers/anggotaController');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/' ));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout',layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine','hbs');

app.listen(3000, () => {
    console.log('Server berjalan di port 3000.');
});  

app.use('/anggota', anggotaController);
app.get('/', (req,res) =>{
    res.redirect("/anggota/list");
});
