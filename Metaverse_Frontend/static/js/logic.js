//Logic.js file

// Graphics constants
// - Map Management Constants
const tiles = 12;                       // In pixels
const plots = tiles * 9;                // In pixels
const roads = tiles * 2;                // In pixels

//- Canvas and Context
const mainCanvas = document.getElementById("mainCanvas");
const mainCtx = mainCanvas.getContext('2d');
const worldImage = new Image();

// Canvas drawing functions
function drawCanvas(){
    mainCanvas.width = 3 * plots + 4 * roads;
    mainCanvas.height = 3 * plots + 4 * roads;
    worldImage.src = 'static/img/Moraland.png';
    worldImage.onload = () => {
        mainCtx.drawImage(worldImage, 0, 0);
    }
}

drawCanvas();