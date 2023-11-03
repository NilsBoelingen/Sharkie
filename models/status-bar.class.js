class StatusBar extends DrawableObject {
    x = 10;
    y = 0;
    height = 80;
    width = 80;

    IMAGE = 'img/4. Marcadores/green/100_  copia 3.png';

    constructor() {
        super();
        this.loadImage(this.IMAGE);
    }

}