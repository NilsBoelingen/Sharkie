class PufferFish extends MovableObject {
    width = 100;
    height = 100;
    world;
    offset = {
        top: 10,
        bottom: 30,
        left: 10,
        right: 10,
    };
    damage = 5;
    energy = 100;

    IMAGES_SWIM_GREEN = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];
    IMAGES_SWIM_ORANGE = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png',
    ];
    IMAGES_SWIM_RED = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png',
    ];
    IMAGES_DEAD_PUFFER = [
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1-2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2-3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3-3.png',
    ];

    /**
     * This function load the images, the random position and the random speed of the puffer fishes
     * 
     */
    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 200 + Math.random() * 4000;
        this.y = 5 + Math.random() * 300;
        this.speed = 0.15 + Math.random() * 0.5;
        this.loadImages(this.IMAGES_SWIM_GREEN);
        this.loadImages(this.IMAGES_SWIM_ORANGE);
        this.loadImages(this.IMAGES_SWIM_RED);
        this.animate();
    }

    /**
     * This function trigger the animation and the movement
     * 
     */
    animate() {
        let images = this.randomColor();
        setInterval(() => this.pufferFishMovement(), 1000 / 60);
        setInterval(() => this.pufferFishAnimation(images), 100);
    }

    /**
     * This function trigger the right movement
     * 
     */
    pufferFishMovement() {
        if (this.isDead()) {
            this.deadMovement();
        } else {
            if (this.checkGameStarted()) {
                this.moveLeft();
            }
        }
    }

    /**
     * This function move the pufferfisch left and up when they are dead
     * 
     */
    deadMovement() {
        this.moveLeft();
        this.speed_y = 2;
        this.speed_x = 4;
        if (this.y <= 180) {
            this.moveUp();
        } else if (this.y > 180) {
            this.moveDown();
        }
    }

    /**
     * This function play the right animation
     * 
     * @param {string} images This are the Arrays of the images 
     */
    pufferFishAnimation(images) {
        if (images == this.IMAGES_SWIM_GREEN && this.isDead()) {
            this.loadImage(this.IMAGES_DEAD_PUFFER[0]);
        } else if (images == this.IMAGES_SWIM_RED && this.isDead()) {
            this.loadImage(this.IMAGES_DEAD_PUFFER[2]);
        } else if (images == this.IMAGES_SWIM_ORANGE && this.isDead()) {
            this.loadImage(this.IMAGES_DEAD_PUFFER[1]);
        } else {
            this.playAnimation(images);
        }
    }

    /**
     * This function randomice the color of the puffer fishes
     * 
     * @returns The arrays of different collor types
     */
    randomColor() {
        let i = Math.random() * 3;
        if (i <= 1) {
            return this.IMAGES_SWIM_GREEN;
        } else if (i >= 2) {
            return this.IMAGES_SWIM_RED;
        } else if (i > 1 && i < 2) {
            return this.IMAGES_SWIM_ORANGE;
        };
    }
}