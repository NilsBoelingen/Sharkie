class Poison extends MovableObject {
    width = 80;
    height = 100;
    offset = {
        top: 40,
        bottom: 5,
        left: 15,
        right: 15,
    };

    IMAGES = [
        'img/4. Marcadores/Posión/Animada/1.png',
        'img/4. Marcadores/Posión/Animada/2.png',
        'img/4. Marcadores/Posión/Animada/3.png',
        'img/4. Marcadores/Posión/Animada/4.png',
        'img/4. Marcadores/Posión/Animada/5.png',
        'img/4. Marcadores/Posión/Animada/6.png',
        'img/4. Marcadores/Posión/Animada/7.png',
        'img/4. Marcadores/Posión/Animada/8.png',

    ];

    /**
     * This function load the images and a random position for the poison bottles
     * 
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 300 + Math.random() * 4000;
        this.y = 20 + Math.random() * 300;
        this.animate();
    }

    /**
     * This function animate the poison bottles
     * 
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 150);
    }
}