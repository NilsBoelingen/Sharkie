class Endboss extends MovableObject {
    width = 0;
    height = 0;
    y = -100;
    world;
    offset = {
        top: 160,
        bottom: 80,
        left: 30,
        right: 30,
    };
    damage = 10;
    energy = 100;
    lastHit = 0;
    firstContact = false;

    IMAGES_INTRO = [
        'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        'img/2.Enemy/3 Final Enemy/1.Introduce/10.png',
    ];

    IMAGES_SWIM = [
        'img/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/2.Enemy/3 Final Enemy/2.floating/13.png',
    ];

    IMAGES_ATTACK = [
        'img/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/2.Enemy/3 Final Enemy/Attack/6.png',
    ];

    IMAGES_HURT = [
        'img/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/2.Enemy/3 Final Enemy/Hurt/4.png',
    ];

    IMAGES_DEAD = [
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
    ];

    constructor() {
        super().loadImage('img/2.Enemy/3 Final Enemy/2.floating/1.png');
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 5000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.speed_y = 0.8;
                setTimeout(() => {
                    this.moveUp();
                }, 200);
            } else if (this.isHurt()) {

            } else if (this.firstContact) {
                this.moveLeft();
            };
        }, 1000 / 60);

        let i = 0;
        setInterval(() => {
            if (this.firstContact) {
                this.width = 500;
                this.height = 500;
                if (i < 10) {
                    this.playAnimation(this.IMAGES_INTRO);
                } else if (this.isDead()) {
                    this.playAnimation(this.IMAGES_DEAD);
                } else if (this.isHurt()) {
                    let j = 0;
                    if (j < 4) {
                        this.playAnimation(this.IMAGES_HURT);
                    };
                    i++;
                    this.speed_x += 0.15;
                } else if (this.checkCharacterDistance()) {
                    this.playAnimation(this.IMAGES_ATTACK);
                } else {
                    this.playAnimation(this.IMAGES_SWIM);
                }
                i++;
            };
        }, 100);

        setInterval(() => {
            if (this.world.character.x >= 4600) {
                this.firstContact = true;
                console.log(this.firstContact);
            }
        }, 100);
    }

    checkCharacterDistance() {
        return this.x - this.world.character.x < 210;
    }

    isHurt() {
        let timepast = new Date().getTime() - this.lastHit;
        timepast = timepast / 1000;
        return timepast < 1;
    }
}