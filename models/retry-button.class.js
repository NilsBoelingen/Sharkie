class RetryButton extends DrawableObject {
    IMAGES = [
        'img/6.Botones/Try again/Recurso 15.png',
        'img/6.Botones/Try again/Recurso 16.png',
        'img/6.Botones/Try again/Recurso 17.png',
        'img/6.Botones/Try again/Recurso 18.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.width = 400;
        this.height = 80;
        this.x = 160;
        this.y = 300;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 250);
    }
}