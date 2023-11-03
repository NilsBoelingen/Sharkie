class StartButton extends DrawableObject {
    IMAGES = [
        'img/6.Botones/Start/1.png',
        'img/6.Botones/Start/2.png',
        'img/6.Botones/Start/3.png',
        'img/6.Botones/Start/4.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.width = 150;
        this.height = 60;
        this.x = 415;
        this.y = 390;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 250);
    }
}