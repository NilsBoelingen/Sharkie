class EndScreenWin extends DrawableObject {
    IMAGES_WIN = [
        'img/6.Botones/Tittles/You win/Recurso 19.png',
        'img/6.Botones/Tittles/You win/Recurso 20.png',
        'img/6.Botones/Tittles/You win/Recurso 21.png',
        'img/6.Botones/Tittles/You win/Recurso 22.png',
    ]

    /**
     * This function load the images, the size and the position of the winning screen
     * 
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_WIN);
        this.width = 450;
        this.height = 100;
        this.x = 135;
        this.y = 150;
        this.animate();
    }

    /**
     * This function animate the winning screen
     * 
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WIN);
        }, 250);
    }
}