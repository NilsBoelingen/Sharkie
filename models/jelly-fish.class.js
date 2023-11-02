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

    IMAGES_SWIM_LILA = [
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png',
    ];
    IMAGES_SWIM_RED = [
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

    constructor() {
        super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
        this.x = 200 + Math.random() * 500;
        this.y = 5 + Math.random() * 300;
        this.speed = 0.15 + Math.random() * 0.5;
        this.loadImages(this.IMAGES_SWIM_LILA);
        this.loadImages(this.IMAGES_SWIM_RED);
        this.loadImages(this.IMAGES_SWIM_GREEN);
        this.loadImages(this.IMAGES_SWIM_PINK);
        this.animate();
    }

    animate() {
        let images = this.randomColor();
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(images);
        }, 100);
    }

    randomColor() {
        let i = Math.random() * 2;
        if (!this.superDangerous) {
            if (i <= 1) {
                return this.IMAGES_SWIM_LILA;
            } else if (i > 1) {
                return this.IMAGES_SWIM_RED;
            };
        } else if (this.superDangerous) {
            if (i <= 1) {
                return this.IMAGES_SWIM_GREEN;
            } else if (i > 1) {
                return this.IMAGES_SWIM_PINK;
            };
        }
    }
}