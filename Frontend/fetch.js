var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
var W = 300, H = 600;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;

// draw a single square at (x, y)
function drawBlock(x, y) {
   ctx.fillRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
   ctx.strokeRect(BLOCK_W * x, BLOCK_H * y, BLOCK_W - 1, BLOCK_H - 1);
}

// draws the board and the moving shape
function render() {
   ctx.clearRect(0, 0, W, H);

   ctx.strokeStyle = 'black';
   for (var x = 0; x < COLS; ++x) {
      for (var y = 0; y < ROWS; ++y) {
         if (board[y][x]) {
            ctx.fillStyle = colors[board[y][x] - 1];
            drawBlock(x, y);
         }
      }
   }

   ctx.fillStyle = 'red';
   ctx.strokeStyle = 'black';
   for (var y = 0; y < 4; ++y) {
      for (var x = 0; x < 4; ++x) {
         if (current[y][x]) {
            ctx.fillStyle = colors[current[y][x] - 1];
            drawBlock(currentX + x, currentY + y);
         }
      }
   }
}

document.body.onkeydown =function exe(e) {

   var keys = {
      37: 'left',
      39: 'right',
      40: 'down',
      38: 'rotate',
      32: 'drop'
  };

   if (typeof keys[ e.keyCode ] != 'undefined') {
      keyPress( keys[ e.keyCode ] );
        render();
   }

   fetch(
      'http://localhost:80/index', //  ahora apunta a index.js

      {
         method: 'POST',
         //body: data
         body: JSON.stringify(data),
         headers: { 'Content-Type': 'application/json' }
      }
   )
      .then(function (response) {
         if (response.ok) {
            //return response.text()
            return response.json();
            //console.log(response.json())
         } else {
            throw "Error en la llamada Fetch";
         }

      })
      .then(function (respuestaDelServidor) {
         document.getElementById('resp').innerHTML = respuestaDelServidor.respuesta;
         console.log(respuestaDelServidor);
      })
      .catch(function (err) {
         console.log(err);
      });

}