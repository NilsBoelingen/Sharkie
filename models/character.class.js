class Character extends MovableObject {
    x = 50;
    y = 50;
    width = 300;
    height = 300;
    world;

    IMAGES_SWIM = [
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];

    constructor() {
        super().loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIM);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                let i = this.currentImage % this.IMAGES_SWIM.length;
                let path = this.IMAGES_SWIM[i];
                this.img = this.imageCache[path];
                this.currentImage++;
                this.moveRight();
            } else if (this.world.keyboard.UP) {
                this.moveUp();
            } else if (this.world.keyboard.DOWN) {
                this.moveDown();
            } else if (this.world.keyboard.LEFT) {
                this.moveLeft();
            }
        }, 200);
    }
}