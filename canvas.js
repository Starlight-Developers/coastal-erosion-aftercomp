const canvas = document.getElementById("main");

const ctx = canvas.getContext('2d');

var map = new Map();
var sea = new Sea(.3);

map.createMap();
sea.create();

function createWave() {
    for (var x = 0; x < 80; x++) {
        map.addPixel(x, 79-Math.floor(Math.random()*2), "water");
    }
}

function createWall() {
    map.pixels.forEach(pixel => {
        if (pixel.type == "sand" && map.getPixel(pixel.x, pixel.y+1, "sand").pixel == null) {
            map.addPixel(pixel.x, pixel.y+1, "wall");
        }
    })
}

function createPlants() {
    map.pixels.forEach(pixel => {
        if (pixel.type == "sand" && Math.random() < .01) {
            map.addPixel(pixel.x, pixel.y, "plant");
            for(var x = -1; x <= 1; x++) {
                for(var y = -1; y <= 1; y++) {
                    var sand = map.getPixel(pixel.x+x, pixel.y+y, "sand").pixel;
                    if (sand != null) sand.plant = true;
                }
            }
        }
    })
}

var timer = 0;

createWall(); // comment out to disable walls
createPlants(); // comment out to disable plants

window.setInterval(function() {
    map.moveMap();
    if (timer == 0) {
        createWave();
        timer = 2;
    }
    sea.move();
    sea.draw();
    map.drawMap();

    timer--;
}, 100)
