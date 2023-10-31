class BackgroundObjects extends MovableObject {
    y = 0;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.height = 480;
        this.width = 720;
    }
}