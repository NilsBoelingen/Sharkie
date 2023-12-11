class EndScreenLose extends DrawableObject {
    IMAGES_LOSE = [
        'img/6.Botones/Tittles/Game Over/Recurso 9.png',
        'img/6.Botones/Tittles/Game Over/Recurso 10.png',
        'img/6.Botones/Tittles/Game Over/Recurso 11.png',
        'img/6.Botones/Tittles/Game Over/Recurso 12.png',
        'img/6.Botones/Tittles/Game Over/Recurso 13.png',
    ]

    /**
     * This function load the images, the size and the position from the endscreen
     * 
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_LOSE);
        this.width = 450;
        this.height = 100;
        this.x = 135;
        this.y = 150;
        this.animate();
    }

    /**
     * This function animate the endscreen
     * 
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_LOSE);
        }, 250);
    }
}