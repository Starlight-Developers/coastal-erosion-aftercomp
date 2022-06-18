const canvas = document.getElementById("main");

const ctx = canvas.getContext('2d');

var map = new Map();

map.createMap();
map.addPixel(60, 60, "water");

window.setInterval(function() {
    map.moveMap();
    map.drawMap();
}, 100)
