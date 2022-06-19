const canvas = document.getElementById("main");

const ctx = canvas.getContext('2d');


var map = new Map();
var sea = new Sea(.3);

map.createMap();
sea.create();
map.addPixel(60, 60, "water");


window.setInterval(function() {
    map.moveMap();
    sea.move();
    sea.draw();
    map.drawMap();
}, 100)
