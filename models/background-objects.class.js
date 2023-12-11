class BackgroundObjects extends MovableObject {
    y = 0;

    /**
     * This function load the Images for the Background
     * 
     * @param {string} imagePath That is the path where the image is saved 
     * @param {string} x this is the position on the x-coordinate on canvas where the image been drawed
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.height = 480;
        this.width = 720;
    }
}