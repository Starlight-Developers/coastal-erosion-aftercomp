function randColor() {
    return Math.floor(Math.random() * 256);
}

class Pixel {
    constructor(xpos, ypos, type) {
        this.type = type;
        if (type == "sand") {
            this.color = 'rgba(209, 167, 17, '+(1-Math.random()/2)+')';
        } else if (type == "water") {
            this.color = 'rgba(38, 194, 222, 1.0)';
        }
        this.x = xpos;
        this.y = ypos;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*10, this.y*10, 10, 10)
    }

    move() {
        // this.x -= 1;
        this.y += 1;
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
                if (i+b<40) {
                    this.addPixel(i, b, "sand");
                }
            }
        }
    }

    drawMap() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.pixels.forEach(pixel => {
            pixel.draw();
        })
    }

    moveMap() {
        this.pixels.forEach(pixel => {
            if (pixel.y != 79) {
                if (this.x[pixel.x][pixel.y+1] == null) {
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