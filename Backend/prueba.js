const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const app = express();

const server = https.createServer({
    key: fs.readFileSync(`${__dirname}/localhost-key.pem`, 'utf8'),
    cert: fs.readFileSync(`${__dirname}/localhost.pem`, 'utf8')
}, app);

const routes = require('./routes/index');

// settings ------------------------------------------------------
//app.set('port', process.env.PORT || 80);
app.set('views',path.join(__dirname, '../Frontend/views'));
app.set('view engine', 'ejs');

//middleware -----------------------------------------------------
app.use((req,res,next) => {
    console.log(`${req.url} -${req.method}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes----------------------------------------------------------
app.use(routes);

//static files----------------------------------------------------
app.use(express.static(path.join(__dirname, '../Frontend/css')));

app.use(express.static(path.join(__dirname, 'controllers')));
// -----------------tetris-----------------------------------------


server.listen(443);
//start the server
app.listen(app.get('port'),() =>{
    console.log('servidor iniciado en puerto:', app.get('port'));
});
