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

    constructor() {
        super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 200 + Math.random() * 500;
        this.y = 5 + Math.random() * 300;
        this.speed = 0.15 + Math.random() * 0.5;
        this.loadImages(this.IMAGES_SWIM_GREEN);
        this.loadImages(this.IMAGES_SWIM_ORANGE);
        this.loadImages(this.IMAGES_SWIM_RED);
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