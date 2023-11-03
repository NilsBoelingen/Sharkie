class PoisonBar extends DrawableObject {
    x = 260;
    y = 10;
    height = 60;
    width = 70;

    IMAGE = 'img/4. Marcadores/green/100_ copia 5.png';

    constructor() {
        super();
        this.loadImage(this.IMAGE);
    }
}