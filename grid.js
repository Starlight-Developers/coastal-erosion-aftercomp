function randColor() {
    return Math.floor(Math.random() * 256);
}

function colorLerp(t, color1, color2) {
    var color3 = {r:0, g:0, b:0};
    color3.r = color1.r + (color2.r - color1.r) * t;
    color3.g = color1.g + (color2.g - color1.g) * t;
    color3.b = color1.b + (color2.b - color1.b) * t;
    return color3;
}

class Pixel {
    constructor(xpos, ypos, type) {
        this.type = type;
        if (type == "sand") {
            var color = colorLerp((Math.random()*.6), {r:209, g:167, b:17}, {r:255, g:255, b:255});
            this.color = 'rgba('+(color.r)+', '+(color.g)+', '+(color.b)+', 1.0)';
        } else if (type == "water") {
            this.color = 'white';
        } else if (type == "rand") {
            this.color = 'black';
        }
        this.x = xpos;
        this.y = ypos;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*10, this.y*10, 10, 10)
    }

    move() {
        if (this.type == "water") {
            this.y -= 1;
        }
    }
}

class Map {
    constructor() {
        this.x = new Array(80);
        this.pixels = [];
    }

    createMap() {
        for (var i = 0; i < this.x.length; i++) {
            this.x[i] = new Array(80);
            for (var b = 0; b < this.x.length; b++) {
                if (b<15) {
                    if (!(b == 14 && Math.random()*b>8)) {
                        this.addPixel(i, b, "sand");
                    }
                }
            }
        }
    }

    drawMap() {
        this.pixels.forEach(pixel => {
            pixel.draw();
        })
    }

    moveMap() {
        this.pixels.forEach(pixel => {
            if (pixel.y != 0) {
                if (this.x[pixel.x][pixel.y-1] == null) {
                    this.x[pixel.x][pixel.y] = null;
                    pixel.move();
                    this.x[pixel.x][pixel.y] = pixel;
                }
            }
        })
    }

    addPixel(x, y, type) {
        var pix = new Pixel(x, y, type)
        this.pixels.push(pix);
        this.x[x][y] = pix;
    }
}

function distance(x, y, pixel) {
    return Math.sqrt((pixel.x-x)**2+(pixel.y-y)**2)
}

class Sea {
    constructor(a) {
        this.a = a;
    }

    create() {
        this.pixels = [];
        for (var i = 0; i < 50; i++) {
            this.pixels.push(new Pixel(Math.random()*81, Math.random()*81, "rand"))
            this.pixels[this.pixels.length-1].draw();
        }
    }

    draw() {
        for (var x = 0; x < 80; x++) {
            for (var b = 0; b < 80; b++) {
                var shortDist = 114;
                this.pixels.forEach(pix => {
                    if (distance(x, b, pix) < shortDist) {
                        shortDist = distance(x, b, pix);
                    }
                })
                var g = ((shortDist*40))/255;
                g = Math.round(g*this.a)/this.a;
                if (g != 0) g = 1;
                var water = colorLerp(g, {r: 42, g: 184, b:245}, {r:24, g:107, b:143});
                ctx.fillStyle = 'rgba('+water.r+','+water.g+','+water.b+', 1.0)';
                ctx.fillRect(x*10, b*10, 10, 10);
            }
        }
    }

    move() {
        this.pixels.forEach(pix => {
            var nX = Math.round(Math.random()*2)-1;
            var nY = Math.round(Math.random()*2)-1;
            if(pix.x+nX < 80 && pix.x+nX>0 && pix.y+nY < 80 && pix.y+nY>0) {
                pix.x += nX;
                pix.y += nY;
            }
        })
    }
}
