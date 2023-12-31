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
    introAnimation = false;

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

    /**
     * This function load the images and the position from the endboss and start the animation
     * 
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_SWIM);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 5000;
        this.animate();
    }

    /**
     * This function start the animations of the endboss
     * 
     */
    animate() {
        setInterval(() => this.setEndbossMovement(), 1000 / 60);
        let animateIntervall = setInterval(() => {
            this.playEndbossAnimations(animateIntervall);
        }, 100);
        setInterval(() => this.setFirstContact(), 100);
    }

    /**
     * This function set a variable on true when the charakter had the first contact to the endboss
     * 
     */
    setFirstContact() {
        try {
            if (this.x - this.world.character.x < 500 && !this.firstContact) {
                this.firstContact = true;
                setTimeout(() => {
                    this.introAnimation = true;
                }, 800);
            }
        } catch (e) { }
    }

    /**
     * This function move and animate the endboss
     * 
     */
    setEndbossMovement() {
        if (this.isDead()) {
            this.speed_y = 0.8;
            setTimeout(() => {
                this.moveUp();
            }, 200);
        } else if (this.isHurt()) {
            this.speed_x += 0.005;
        } else if (this.firstContact && this.introAnimation) {
            this.moveLeft();
        };
    }

    /**
     * This function trigger the right animations
     * 
     * @param {string} animateIntervall This is the animation intervall for the endboss
     */
    playEndbossAnimations(animateIntervall) {
        if (this.firstContact) {
            this.width = 500;
            this.height = 500;
            if (!this.introAnimation) {
                this.playIntroAnimation(animateIntervall);
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.world.winGame = true;
                this.world.gameStarted = false;
            } else if (this.isHurt()) {
                this.playEndbossIsHurtAnimation();
            } else if (this.checkCharacterDistance()) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else {
                this.playAnimation(this.IMAGES_SWIM);
            }

        };
    }

    /**
     * This funktion plays the first animation after first contact
     * 
     * @param {string} animateIntervall This is the animation intervall for the endboss
     */
    playIntroAnimation(animateIntervall) {
        clearInterval(animateIntervall);
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_INTRO);
        }, 100)
        setTimeout(() => {
            clearInterval(interval);
            this.animate();
        }, 1000);
    }

    /**
     * This function plays the animation when the endboss get hurt
     * 
     */
    playEndbossIsHurtAnimation() {
        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
        }, 100);
        setTimeout(() => {
            clearInterval(interval)
        }, 400);
    }

    /**
     * 
     * @returns true if the distance is under 290 px
     */
    checkCharacterDistance() {
        return this.x - this.world.character.x < 290;
    }

    /**
     * This function create a timestamp and return that the endboss hit the charakter 1 second ago
     * 
     */
    isHurt() {
        let timepast = new Date().getTime() - this.lastHit;
        timepast = timepast / 1000;
        return timepast < 1;
    }
}