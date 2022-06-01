//Logic.js file

// Graphics constants
// - Map Management Constants
const tiles = 12;                       // In pixels
const plots = tiles * 9;                // In pixels
const roads = tiles * 2;                // In pixels
const initialOffsets = plots + roads;
const plotViewOffsets = plots + (2 * roads);

//- Canvas and Context
const mainCanvas = document.getElementById("mainCanvas");
const mainCtx = mainCanvas.getContext('2d');
const worldImage = new Image();

//- State
const mapView = {mapOffsetX:-1 * initialOffsets, mapOffsetY:-1 * initialOffsets};

// Canvas drawing functions
function drawCanvas(){
    mainCanvas.width = 3 * plots + 4 * roads;
    mainCanvas.height = 3 * plots + 4 * roads;
    worldImage.src = 'static/img/Moraland.png';
    worldImage.onload = () => {
        initializeMap();
    }
}

function initializeMap() {
    drawMapSection(mainCtx, mapView.mapOffsetX, mapView.mapOffsetY);
    drawCursor(plotViewOffsets, plotViewOffsets);
}

function drawMapSection(ctx,originX,originY){
    ctx.drawImage(worldImage,originX,originY);
}

// Add border for selected area
function drawCursor(x,y) {
    mainCtx.strokeRect(x,y,plots,plots);
}

drawCanvas();