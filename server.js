'use strict'

let express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(process.env['PORT'] || 8080);
