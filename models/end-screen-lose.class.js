class EndScreenLose extends DrawableObject {
    IMAGES_LOSE = [
        'img/6.Botones/Tittles/Game Over/Recurso 9.png',
        'img/6.Botones/Tittles/Game Over/Recurso 10.png',
        'img/6.Botones/Tittles/Game Over/Recurso 11.png',
        'img/6.Botones/Tittles/Game Over/Recurso 12.png',
        'img/6.Botones/Tittles/Game Over/Recurso 13.png',
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_LOSE);
        this.width = 300;
        this.height = 100;
        this.x = 210;
        this.y = 140;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_LOSE);
        }, 250);
    }
}