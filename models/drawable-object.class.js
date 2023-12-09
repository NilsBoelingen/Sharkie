class DrawableObject {
    x = 120;
    y = 400;
    img;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;

    IMAGES_START_BUTTON = [
        'img/6.Botones/Start/1.png',
        'img/6.Botones/Start/2.png',
        'img/6.Botones/Start/3.png',
        'img/6.Botones/Start/4.png',
    ];

    constructor() {
        this.loadImages(this.IMAGES_START_BUTTON);
        this.animateStartButton();
    }

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

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {

        }
    }

    drawOuterFrame(ctx) {
        if (this.checkObjectMovable()) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawInnerFrame(ctx) {
        if (this.checkObjectMovable()) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    checkObjectMovable() {
        return this instanceof Character || this instanceof PufferFish || this instanceof Endboss || this instanceof JellyFish || this instanceof Bubble || this instanceof PoisonBubble || this instanceof Coin || this instanceof Poison;
    }

    checkGameStarted() {
        try {
            return this.world.gameStarted;
        } catch (e) {
        }
    }

    animateStartButton() {
        let startButton = document.getElementById('startButton');
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_START_BUTTON.length;
            let path = this.IMAGES_START_BUTTON[i];
            try {
                startButton.setAttribute("style", `background-image: url('${path}');background-size: 100% 100%`)
            } catch (e) {
            }
            this.currentImage++;
        }, 200);
    }
}