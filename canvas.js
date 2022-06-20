const canvas = document.getElementById("main");
const ctx = canvas.getContext('2d');

var scale = 640;
var sandCount = 0;
var sandDestroyed = 0;

canvas.width = scale;
canvas.height = scale;

var walls = document.getElementById("walls");  
var plants = document.getElementById("plants");  
var time = document.getElementById("secondsPassed");
var erode = document.getElementById("erodePercent");
var speed = document.getElementById("speed");

function reset() {
    map = new Map();
    sea = new Sea(.3);
    sandCount = 0;
    sandDestroyed = 0;

    map.createMap();
    sea.create();

    if (walls.checked) {
        createWall();
    }
    if (plants.checked) {
        createPlants();
    }

    timer = 0;
}

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

reset();

function frame() {
    map.moveMap();
    if (timer%20 == 0) {
        createWave();
    }
    time.innerText = timer/10+" seconds have passed.";
    sea.move();
    erode.innerText = Math.trunc(((sandCount-sandDestroyed)/sandCount)*100) + "% of sand is still left.";
    sea.draw();
    map.drawMap();

    timer++;
}

speed.oninput = function() {
    window.setInterval(frame, 100-speed.value)
}

window.setInterval(frame, 100-speed.value)
