class StartScreen extends DrawableObject {
    IMAGE = 'img/3. Background/Mesa de trabajo 1.png';

    constructor() {
        super();
        this.loadImage(this.IMAGE);
        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
    }
}