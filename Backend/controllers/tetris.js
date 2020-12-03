var COLS = 10, ROWS = 20;
var board = [];
var lose;
var interval;
var intervalRender;
var current; // forma actual en movimiento
var currentX, currentY; // posición de la forma actual
var freezed; // La forma actual está asentada en el tablero?
var shapes = [
    [ 1, 1, 1, 0,
      1 ]
   
];
var colors = [
    'cyan'
];

// crea una nueva forma 4x4 en la variable global 'actual'
// 4x4 para cubrir el tamaño cuando se gira la forma
function newShape() {
    var id = Math.floor( Math.random() * shapes.length );
    var shape = shapes[ id ]; // mantener id para relleno de color

    current = [];
    for ( var y = 0; y < 4; ++y ) {
        current[ y ] = [];
        for ( var x = 0; x < 4; ++x ) {
            var i = 4 * y + x;
            if ( typeof shape[ i ] != 'undefined' && shape[ i ] ) {
                current[ y ][ x ] = id + 1;
            }
            else {
                current[ y ][ x ] = 0;
            }
        }
    }
    
    // nueva forma comienza a moverse
    freezed = false;
    // posición donde la forma aparece
    currentX = 2;
    currentY = 0;
}

// limpia el tablero-------------------------------------------------------
function init() {
    for ( var y = 0; y < ROWS; ++y ) {
        board[ y ] = [];
        for ( var x = 0; x < COLS; ++x ) {
            board[ y ][ x ] = 0;
        }
    }
}

// mantener el elemento moviéndose hacia abajo, creando nuevas formas y despejando líneas
function tick() {
    if ( valid( 0, 1 ) ) {
        ++currentY;
    }
    // if el elemento llego al final ??
    else {
        freeze();
        valid(0, 1);
        clearLines();
        if (lose) {
            clearAllIntervals();
            return false;
        }
        newShape();
    }
}

// detener la forma en su posición y fijarla a la tabla
function freeze() {
    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( current[ y ][ x ] ) {
                board[ y + currentY ][ x + currentX ] = current[ y ][ x ];
            }
        }
    }
    freezed = true;
}

// detener la forma en su posición y fijarla
function rotate( current ) {
    var newCurrent = [];
    for ( var y = 0; y < 4; ++y ) {
        newCurrent[ y ] = [];
        for ( var x = 0; x < 4; ++x ) {
            newCurrent[ y ][ x ] = current[ 3 - x ][ y ];
        }
    }

    return newCurrent;
}

// compruebe si alguna línea está llena y límpiela ----------------------------------------------------------------
function clearLines() {
    for ( var y = ROWS - 1; y >= 0; --y ) {
        var rowFilled = true;
        for ( var x = 0; x < COLS; ++x ) {
            if ( board[ y ][ x ] == 0 ) {
                rowFilled = false;
                break;
            }
        }
        if ( rowFilled ) {
            document.getElementById( 'clearsound' ).play();
            for ( var yy = y; yy > 0; --yy ) {
                for ( var x = 0; x < COLS; ++x ) {
                    board[ yy ][ x ] = board[ yy - 1 ][ x ];
                }
            }
            ++y;
        }
    }
}
// lectura de movimientos ------------------------------------------------------------------
function keyPress( key ) {
    switch ( key ) {
        case 'left':
            if ( valid( -1 ) ) {
                --currentX;
            }
            break;
        case 'right':
            if ( valid( 1 ) ) {
                ++currentX;
            }
            break;
        case 'down':
            if ( valid( 0, 1 ) ) {
                ++currentY;
            }
            break;
        case 'rotate':
            var rotated = rotate( current );
            if ( valid( 0, 0, rotated ) ) {
                current = rotated;
            }
            break;
        case 'drop':
            while( valid(0, 1) ) {
                ++currentY;
            }
            tick();
            break;
    }
}

// comprueba si la posición resultante de la forma actual será factible ---------------------------------
function valid( offsetX, offsetY, newCurrent ) {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = currentX + offsetX;
    offsetY = currentY + offsetY;
    newCurrent = newCurrent || current;

    for ( var y = 0; y < 4; ++y ) {
        for ( var x = 0; x < 4; ++x ) {
            if ( newCurrent[ y ][ x ] ) {
                if ( typeof board[ y + offsetY ] == 'undefined'
                  || typeof board[ y + offsetY ][ x + offsetX ] == 'undefined'
                  || board[ y + offsetY ][ x + offsetX ]
                  || x + offsetX < 0
                  || y + offsetY >= ROWS
                  || x + offsetX >= COLS ) {
                    if (offsetY == 1 && freezed) {
                        lose = true; // perder si la forma actual se establece en la fila superior (toca el vorde superior)
                        document.getElementById('playbutton').disabled = false;
                    } 
                    return false;
                }
            }
        }
    }
    return true;
}

function playButtonClicked() {
    newGame();
    document.getElementById("playbutton").disabled = true;
}

function newGame() {
    clearAllIntervals();
    intervalRender = setInterval( render, 30 );
    init();
    newShape();
    lose = false;
    interval = setInterval( tick, 400 );
}

function clearAllIntervals(){
    clearInterval( interval );
    clearInterval( intervalRender );
}