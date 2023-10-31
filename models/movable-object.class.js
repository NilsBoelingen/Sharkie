class MovableObject {
    x = 120;
    y = 400;
    img;
    imageCache = {};
    currentImage = 0;
    speed_x = 0.15;
    speed_y = 0.15;
    acceleration = 0.1;
    otherDirection = false;

    applyWaterResistanceX() {
            this.speed_x += this.acceleration
    };

    applyWaterResistanceY() {
            this.speed_y += this.acceleration
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '4';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed_x;
    }

    moveLeft() {
        this.x -= this.speed_x;
    }

    moveUp() {
        this.y -= this.speed_y;
    }

    moveDown() {
        this.y += this.speed_y;
    }
}