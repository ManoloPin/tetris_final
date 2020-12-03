function exe(){
    //const data = new FormData();
    //data.append('n1', "1");
    //data.append('n2', "5");
    //data.append('op', "sumar");
    var data = {a: '3', b:'5', op:'sumar'};
 
    fetch(
       'http://localhost:80/calc', // cambiar 
 
       {
          method: 'POST',
          //body: data
          body:JSON.stringify(data),
          headers:{'Content-Type': 'application/json'}
       }
    )
    .then(function(response) {
       if(response.ok) {
          //return response.text()
          return response.json();
          //console.log(response.json())
       } else {
          throw "Error en la llamada Fetch";
       }
 
    })
    .then(function(respuestaDelServidor) {
       document.getElementById('resp').innerHTML=respuestaDelServidor.respuesta;
       console.log(respuestaDelServidor);
    })
    .catch(function(err) {
       console.log(err);
    });
 
 }