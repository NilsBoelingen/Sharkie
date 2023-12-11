class StartScreen extends DrawableObject {
    IMAGE = 'img/3. Background/Mesa de trabajo 1.png';

    /**
     * This function load the start screen on the right position and the right size
     * 
     */
    constructor() {
        super();
        this.loadImage(this.IMAGE);
        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
    }
}