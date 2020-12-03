var express = require('express');
var cors = require('cors');
const Calc=require('./classes/Calc');

var app = express();

app.use(express.json());
app.use(cors());

app.post('/calc', function(request, response){
    
    var req=request.body;
    if(req.op==="sumar"){
        var casio=new Calc(req.a, req.b);
        var resp={respuesta:casio.sumar()};
    }
    
    console.log("Respuesta para el cliente: "+JSON.stringify(resp));
    console.log(request.body);      // El JSON que llegó
    response.send(resp);    // respondiendo al cliente
});

app.listen(5500);