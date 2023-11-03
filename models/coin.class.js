class Coin extends MovableObject {
    width = 50;
    height = 50;
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
    };

    IMAGES = [
        'img/4. Marcadores/1. Coins/1.png',
        'img/4. Marcadores/1. Coins/2.png',
        'img/4. Marcadores/1. Coins/3.png',
        'img/4. Marcadores/1. Coins/4.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 300 + Math.random() * 4000;
        this.y = 50 + Math.random() * 300;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 150);
    }
}