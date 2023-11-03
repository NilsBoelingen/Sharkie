class JellyFish extends MovableObject {
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
    superDangerous = false;
    energy = 100;
    speed_x = 0.15;
    speed_y = 0.15;
    accelerationX = 0.1;
    accelerationY = 0.3;

    IMAGES_SWIM_LILA = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];
    IMAGES_SWIM_YELLOW = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png',
    ];
    IMAGES_SWIM_GREEN = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png',
    ];
    IMAGES_SWIM_PINK = [
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png',
        'img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png',
    ];

    IMAGES_DEAD_GREEN = [
        'img/2.Enemy/2 Jelly fish/Dead/green/g1.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g2.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g3.png',
        'img/2.Enemy/2 Jelly fish/Dead/green/g4.png',
    ];

    IMAGES_DEAD_LILA = [
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png',
    ];

    IMAGES_DEAD_PINK = [
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Pink/P4.png',
    ];

    IMAGES_DEAD_YELLOW = [
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
        'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png',
    ];

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.x = 200 + Math.random() * 4000;
        this.y = 5 + Math.random() * 300;
        this.speed = 0.15 + Math.random() * 0.5;
        this.loadImages(this.IMAGES_SWIM_LILA);
        this.loadImages(this.IMAGES_SWIM_YELLOW);
        this.loadImages(this.IMAGES_SWIM_GREEN);
        this.loadImages(this.IMAGES_SWIM_PINK);
        this.loadImages(this.IMAGES_DEAD_GREEN);
        this.loadImages(this.IMAGES_DEAD_LILA);
        this.loadImages(this.IMAGES_DEAD_PINK);
        this.loadImages(this.IMAGES_DEAD_YELLOW);
        this.animate();
    }

    animate() {
        let images = this.randomColor();
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.checkJellyFishType(images);
        }, 100);

        setInterval(() => {
            if (this.isDead()) {
                this.checkDeadAnimationType(images);
                this.speed_x = -1;
                this.applyWaterResistance();
            }
        }, 150);
    }

    applyWaterResistance() {
        if (this.speed_x < 0) {
            this.moveRight();
            this.speed_x += this.accelerationX;
            setTimeout(() => {
                this.moveUp();
                this.speed_y += this.accelerationY;
            }, 100);
        } else if (this.speed_x >= 0) {
            this.moveUp();
            this.speed_y += this.accelerationY;
        }
    }

    checkDeadAnimationType(images) {
        if (images == this.IMAGES_SWIM_GREEN) {
            this.playAnimation(this.IMAGES_DEAD_GREEN);
        } else if (images == this.IMAGES_SWIM_LILA) {
            this.playAnimation(this.IMAGES_DEAD_LILA);
        } else if (images == this.IMAGES_SWIM_PINK) {
            this.playAnimation(this.IMAGES_DEAD_PINK);
        } else if (images == this.IMAGES_SWIM_YELLOW) {
            this.playAnimation(this.IMAGES_DEAD_YELLOW);
        }; 
    }

    checkJellyFishType(images) {
        if (!this.superDangerous) {
            this.playAnimation(images);
        } else if (this.superDangerous) {
            if (images == this.IMAGES_SWIM_LILA) {
                this.playAnimation(this.IMAGES_SWIM_PINK);
            } else if (images == this.IMAGES_SWIM_YELLOW) {
                this.playAnimation(this.IMAGES_SWIM_GREEN);
            }
        }
    }

    randomColor() {
        let i = Math.random() * 2;
        if (i <= 1) {
            return this.IMAGES_SWIM_LILA;
        } else if (i > 1) {
            return this.IMAGES_SWIM_YELLOW;
        };
    }
}