class CoinBar extends DrawableObject {
    x = 150;
    y = 5;
    height = 80;
    width = 80;

    IMAGE = 'img/4. Marcadores/green/100_ copia 6.png';

    constructor() {
        super();
        this.loadImage(this.IMAGE);
    }
}