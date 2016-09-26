'use strict'

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env['PORT'] || 8080;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile('public/views/index.html', { root: __dirname });
});

app.get('/reset_password/:token', (req, res) => {

    res.sendFile('public/views/index_password.html', { root: __dirname });
});

app.listen(port);
