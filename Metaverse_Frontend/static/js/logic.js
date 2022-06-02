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
const plotCanvas = document.getElementById("plotCanvas");
const plotCtx = plotCanvas.getContext('2d');
const worldImage = new Image();

//- State
const mapView = {mapOffsetX:-1 * initialOffsets, mapOffsetY:-1 * initialOffsets};
const plotView = {plotX:0, plotY:0, locationX:0, locationY:0};

// web3 constants
const ethers = Moralis.web3Library;

// Canvas drawing functions
function drawCanvas(){
    mainCanvas.width = 3 * plots + 4 * roads;
    mainCanvas.height = 3 * plots + 4 * roads;
    plotCanvas.width = plots;
    plotCanvas.height = plots;
    worldImage.src = 'static/img/Moraland.png';
    worldImage.onload = () => {
        initializeMap();
    }
}

function initializeMap() {
    updatePlotLocation();
    setPlotData();
    drawMapSection(mainCtx, mapView.mapOffsetX, mapView.mapOffsetY);
    drawCursor(plotViewOffsets, plotViewOffsets);
    drawMapSection(plotCtx, -1 * plotView.locationX, -1 * plotView.locationY);
}

// Animate functions
function move(direction) {
    const validMove = validateMove(direction);
    if (validMove) {
        updateView(direction);
        updatePlotLocation();
        drawMapSection(mainCtx, mapView.mapOffsetX, mapView.mapOffsetY);
        drawCursor(plotViewOffsets, plotViewOffsets);
        drawMapSection(plotCtx, -1 * plotView.locationX, -1 *plotView.locationY);
        setPlotData();
    }
}

function validateMove(direction) {
    switch(direction){
        case 'ArrowRight': return !(plotView.plotX == 5);
        case 'ArrowUp': return   !(plotView.plotY == 0);
        case 'ArrowLeft': return !(plotView.plotX == 0);
        case 'ArrowDown': return !(plotView.plotY == 5);
    }
}

function updateView(direction) {
    switch(direction){
        case 'ArrowRight': 
            plotView.plotX += 1;
            mapView.mapOffsetX -= plots + roads;
            break;
        case 'ArrowDown': 
            plotView.plotY += 1;
            mapView.mapOffsetY -= plots + roads;
            break;
        case 'ArrowLeft': 
            plotView.plotX -= 1;
            mapView.mapOffsetX += plots + roads;
            break;
        case 'ArrowUp': 
            plotView.plotY -= 1;
            mapView.mapOffsetY += plots + roads;
            break;
    }
}

function drawMapSection(ctx,originX,originY){
    ctx.drawImage(worldImage,originX,originY);
}

// Add border for selected area
function drawCursor(x,y) {
    mainCtx.strokeRect(x,y,plots,plots);
}

function updatePlotLocation() {
    plotView.locationX = -1 * mapView.mapOffsetX + plotViewOffsets;
    plotView.locationY = -1 * mapView.mapOffsetY + plotViewOffsets;
}

// UI Functions
function setPlotData() {
    const plotID = ethers.utils.id(JSON.stringify(plotView));
    document.getElementById("plotX").value = plotView.plotX;
    document.getElementById("plotY").value = plotView.plotY;
    document.getElementById("locationX").value = plotView.locationX;
    document.getElementById("locationY").value = plotView.locationY;
    document.getElementById("plotID").value = plotID;
}

drawCanvas();
window.addEventListener('keydown' , (e) => {
    move(e.key)
});