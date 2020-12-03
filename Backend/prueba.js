const express = require('express');
const path = require('path');
const app = express();

const routes = require('./routes/index');

// settings ------------------------------------------------------
app.set('port', process.env.PORT || 80);
app.set('views',path.join(process.cwd(), '../Frontend/views'));
app.set('view engine', 'ejs');

//middleware -----------------------------------------------------
app.use((req,sres,next) => {
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



//start the server
app.listen(app.get('port'),() =>{
    console.log('server on port ', app.get('port'));
});
