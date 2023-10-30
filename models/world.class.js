class World {
    canvas;
    ctx;
    keyboard;
    character = new Character();
    enemies = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
    ];
    backgroundObjects = [
        new BackgroundObjects('img/3. Background/Layers/5. Water/L2.png', -719),
        new BackgroundObjects('img/3. Background/Layers/1. Light/2.png', -719),
        new BackgroundObjects('img/3. Background/Layers/4.Fondo 2/L2.png', -719),
        new BackgroundObjects('img/3. Background/Layers/3.Fondo 1/L2.png', -719),
        new BackgroundObjects('img/3. Background/Layers/2. Floor/L2.png', -719),
        new BackgroundObjects('img/3. Background/Layers/5. Water/L1.png', 0),
        new BackgroundObjects('img/3. Background/Layers/1. Light/1.png', 0),
        new BackgroundObjects('img/3. Background/Layers/4.Fondo 2/L1.png', 0),
        new BackgroundObjects('img/3. Background/Layers/3.Fondo 1/L1.png', 0),
        new BackgroundObjects('img/3. Background/Layers/2. Floor/L1.png', 0),
        new BackgroundObjects('img/3. Background/Layers/5. Water/L2.png', 719),
        new BackgroundObjects('img/3. Background/Layers/1. Light/2.png', 719),
        new BackgroundObjects('img/3. Background/Layers/4.Fondo 2/L2.png', 719),
        new BackgroundObjects('img/3. Background/Layers/3.Fondo 1/L2.png', 719),
        new BackgroundObjects('img/3. Background/Layers/2. Floor/L2.png', 719),
    ];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.enemies.world = this;
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}