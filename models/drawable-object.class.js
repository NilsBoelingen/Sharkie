class DrawableObject {
    x = 120;
    y = 400;
    img;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    world;
    gameIsOver;

    IMAGES_START_BUTTON = [
        'img/6.Botones/Start/1.png',
        'img/6.Botones/Start/2.png',
        'img/6.Botones/Start/3.png',
        'img/6.Botones/Start/4.png',
    ];

    IMAGES_RETRY_BUTTON = [
        'img/6.Botones/Try again/Recurso 15.png',
        'img/6.Botones/Try again/Recurso 16.png',
        'img/6.Botones/Try again/Recurso 17.png',
        'img/6.Botones/Try again/Recurso 18.png',
    ];

    /**
     * This function load the images of the start and the retry button and animate them
     * 
     */
    constructor() {
        this.loadImages(this.IMAGES_START_BUTTON);
        this.loadImages(this.IMAGES_RETRY_BUTTON);
        this.animateStartButton();
        this.animateRetryButton();
    }

    /**
     * This function load an single image
     * 
     * @param {string} path This is the path of the image you want to load
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function load an array of images to the image cache
     * 
     * @param {string} array This is the array, where the image-paths been saved that you want to load
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * This function animate the images from the cache
     * 
     * @param {string} images These are the images from the cache
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * These function draw the images on the canvas
     * 
     * @param {string} ctx This is the canves where the images been drawed
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {

        }
    }

    /**
     * These function draw frames on the objects in game
     * 
     * @param {string} ctx This is the canves where the images been drawed
     */
    drawOuterFrame(ctx) {
        if (this.checkObjectMovable()) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * This function draws frames around the objects and takes an offset into account
     * 
     * @param {string} ctx This is the canves where the images been drawed 
     */
    drawInnerFrame(ctx) {
        if (this.checkObjectMovable()) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    /**
     * This function checks whether the object can move
     * 
     * @returns returns true if the object can move
     */
    checkObjectMovable() {
        return this instanceof Character || this instanceof PufferFish || this instanceof Endboss || this instanceof JellyFish || this instanceof Bubble || this instanceof PoisonBubble || this instanceof Coin || this instanceof Poison;
    }

    /**
     * This function checks whether the game has started
     * 
     * @returns returns true when the game has started
     */
    checkGameStarted() {
        try {
            return this.world.gameStarted;
        } catch (e) {
        }
    }

    /**
     * This function sets the start button animation
     * 
     */
    animateStartButton() {
        let startButton = document.getElementById('startButton');

        let interval = setInterval(() => {
            if (!startButtonActivated) {
                this.playAnimationStartButton(startButton);
            } else {
                this.hideStartButton(startButton, interval);
            }
        }, 200);
    }

    /**
     * This function plays the start button animation
     * 
     */
    playAnimationStartButton (startButton) {
        let i = this.currentImage % this.IMAGES_START_BUTTON.length;
        let path = this.IMAGES_START_BUTTON[i];
        try {
            startButton.setAttribute("style", `background-image: url('${path}');background-size: 100% 100%`)
        } catch (e) {}
        this.currentImage++;
    }

    /**
     * This function hides the start button, when the game has started
     * 
     * @param {string} startButton This is the start button on start screen
     * @param {string} interval This is the animation-interval from the start button
     */
    hideStartButton(startButton, interval) {
        clearInterval(interval);
        try {
        startButton.classList.add('d-none');
        } catch (e) {}
    }

    /**
     * This function sets the retry button animation
     * 
     */
    animateRetryButton() {
        let retryButton = document.getElementById('retryButton');
        setInterval(() => {
            if (this.gameIsOver) {
                this.playAnimationRetryButton(retryButton);
            }
        }, 200);
    }

    /**
     * This function plays the retry button animation
     * 
     */
    playAnimationRetryButton(retryButton) {
        retryButton.classList.remove('d-none');
        let i = this.currentImage % this.IMAGES_RETRY_BUTTON.length;
        let path = this.IMAGES_RETRY_BUTTON[i];
        try {
            retryButton.setAttribute("style", `background-image: url('${path}');background-size: 100% 100%`)
        } catch (e) {}
        this.currentImage++;
    }
}