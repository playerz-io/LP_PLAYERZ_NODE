'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env['PORT'] || 8080;
let nodemailer = require('nodemailer');
let mg = require('nodemailer-mailgun-transport');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {

    res.setHeader('Cache-Control', 'public, max-age=3600');
    // Pass to next layer of middleware
    next();
});
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile('public/views/index.html', {
        root: __dirname
    });
});

app.get('/reset_password/:token', (req, res) => {

    res.sendFile('public/views/index_password.html', {
        root: __dirname
    });
});

app.post('/email', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.body);

    var auth = {

        auth: {
            api_key: 'key-2cbf56735c697b79b2b69306c4d0b79c',
            domain: 'playerz.io'
        }
    };
    console.log(auth);


    var transporter = nodemailer.createTransport(mg(auth));
    let mailOptions = {
        to: 'contact@playerz.io',
        from: req.body.email,
        subject: '[Formulaire de contact] nouveau message de ' + req.body.name,
        text: req.body.body
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Server is ready to take our messages');
            res.redirect('/');
            // TODO : REDIRECT TO A MODAL TO CONFIRM SENDING EMAIL
        }
    });
});

app.listen(port);
