class World {
    canvas;
    ctx;
    keyboard;
    startScreen = new StartScreen();
    level = level1;
    character = new Character();
    enemies = level1.enemies;
    backgroundObjects = level1.backgroundObjects;
    coins = level1.coins;
    poisons = level1.poisons;
    statusBar = new StatusBar();
    poisonBar = new PoisonBar();
    coinBar = new CoinBar();
    bubbles = [];
    poisonBubbles = [];
    endScreenLose = new EndScreenLose();
    endScreenWin = new EndScreenWin();
    camera_x = 0;
    lastThrowTime = 0;
    gameStarted = false;
    gameOver = false;
    winGame = false;
    game_musik = new Audio('audio/game_musik.mp3');
    intro_musik = new Audio('audio/intro.mp3');
    muteMusik = false;
    touchX = 0;
    touchY = 0;
    do = new DrawableObject();

    /**
     * This function initiate the play world
     * 
     * @param {string} canvas This is the canvas, where the world is draw
     * @param {string} keyboard These are keyboard from the user to set the keybindings
     */
    constructor(canvas, keyboard) {
        this.setCanvas(canvas, keyboard);
        this.draw();
        this.run();
        this.setWorld();
        this.playMusik();
        this.showTouchButtons();
        this.checkGameIsOver()
    }

    /**
     * This function init the canvas to draw
     * 
     * @param {string} canvas This is the canvas, where the world is draw
     * @param {string} keyboard These are keyboard from the user to set the keybindings
     */
    setCanvas(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx.font = 'bold 40px Arial';
        this.ctx.fillStyle = 'white';
    }

    /**
     * This function start the interval to check collissions
     * 
     */
    run() {
        setStopableInterval(() => {
            this.checkCollisions();
        }, 200);
    }

    /**
     * This function is trigger by onclick and start the game
     * 
     */
    startGame() {
        if (this.canStartGame()) {
            this.gameStarted = true;
        } else if (this.canRetryGameOver()) {
            location.reload();
        } else if (this.canRetryWin()) {
            location.reload();
        }
    }

    /**
     * This function check, that game can be startet
     * 
     * @returns true if can be start
     */
    canStartGame() {
        return !this.gameStarted && !this.gameOver && !this.winGame;
    }

    /**
     * This function check, that game can be restartet
     * 
     * @returns true if can be restart
     */
    canRetryGameOver() {
        return !this.gameStarted && this.gameOver && !this.winGame;
    }

    /**
     * This function check, that game can be restartet
     * 
     * @returns true if can be restart
     */
    canRetryWin() {
        return !this.gameStarted && !this.gameOver && this.winGame;
    }

    /**
     * This function is to check that the game is over to draw a retry button
     * 
     */
    checkGameIsOver() {
        setInterval(() => {
            if (!this.gameStarted && this.gameOver && !this.winGame) {
                this.do.gameIsOver = true;
            } else if (!this.gameStarted && !this.gameOver && this.winGame) {
                this.do.gameIsOver = true;
            } else {
                this.do.gameIsOver = false;
            }
        }, 100);
    }

    /**
     * This function is used to check some different colission between objects
     * 
     */
    checkCollisions() {
        let i = 0;
        let j = 0;
        let k = 0;
        let l = 0;
        this.enemies.forEach((enemy) => this.checkColissionEnemy(enemy));
        this.enemies.forEach((enemy) => this.checkColissionBubble(enemy, k));
        this.enemies.forEach((enemy) => this.checkColissionPoisonBubble(enemy, l));
        this.enemies.forEach((enemy) => this.isEnemyDead(enemy));
        this.coins.forEach((coin) => {
            this.checkColissionCoin(coin, i);
            i++;
        });
        this.poisons.forEach((poison) => {
            this.checkColissionPoison(poison, j);
            j++;
        });
    }

    /**
     * This function check that the cheracter is colliding whit an enemy
     * 
     * @param {string} enemy This is the enemy you want to check 
     */
    checkColissionEnemy(enemy) {
        if (this.character.isColliding(enemy) && !this.keyboard.SPACE) {
            this.character.characterGetHit(enemy);
        } else if (this.character.isAttacking(enemy) && this.keyboard.SPACE) {
            this.character.enemyGetHit(enemy);
        }
    }

    /**
     * This function check the collision between an enemy and a bubble
     * 
     * @param {string} enemy This is the enemy you want to check
     * @param {*} k This is the index from the bubble
     */
    checkColissionBubble(enemy, k) {
        k = 0;
        this.bubbles.forEach((bubble) => {
            this.isJellyFish(bubble, enemy, k);
            k++;
        });
    }

    /**
     * This function is used to set an jelly fish to dead when its hit from an bubble
     * 
     * @param {string} bubble This is the bubble that hit
     * @param {string} enemy This is the hitted enemy
     * @param {string} k This is the index of the bubble
     */
    isJellyFish(bubble, enemy, k) {
        if (enemy.isColliding(bubble) && enemy instanceof JellyFish) {
            enemy.energy = 0;
            this.bubbles.splice(k, 1);
            enemy.animate();
        };
    }

    /**
     * This function check the collision between an enemy and a poison bubble
     * 
     * @param {string} enemy This is the enemy you want to check
     * @param {*} l This is the index from the bubble
     */
    checkColissionPoisonBubble(enemy, l) {
        l = 0;
        this.poisonBubbles.forEach((poisonBubble) => {
            this.isEndboss(poisonBubble, enemy, l);
            l++;
        });
    }

    /**
     * This function is used to set the endboss to dead when its hit from an poison bubble
     * 
     * @param {string} bubble This is the bubble that hit
     * @param {string} enemy This is the hitted endboss
     * @param {string} l This is the index of the poison bubble
     */
    isEndboss(poisonBubble, enemy, l) {
        if (enemy.isColliding(poisonBubble) && enemy instanceof Endboss) {
            if (enemy.energy <= 0) {
                enemy.energy = 0;
            } else {
                enemy.lastHit = new Date().getTime();
                enemy.energy -= poisonBubble.damage;
                this.poisonBubbles.splice(l, 1);
            };
        };
    }

    /**
     * This function set se offset down for an dead enemy
     * 
     * @param {string} enemy This is the dead enemy
     */
    isEnemyDead(enemy) {
        if (enemy.isDead()) {
            enemy.changeOffset(enemy);
        };
    }

    /**
     * This function check the collision between an coin and the character
     * 
     * @param {string} coin This is the coin you want to check
     * @param {*} i This is the index of the coin
     */
    checkColissionCoin(coin, i) {
        if (this.character.isColliding(coin)) {
            this.character.collectedCoins += 1;
            this.coins.splice(i, 1);

        };
    }

    /**
     * This function check the collision between an poison bottle and the character
     * 
     * @param {string} poison This is the poison bottle you want to check
     * @param {*} j This is the index of the poison bottle
     */
    checkColissionPoison(poison, j) {
        if (this.character.isColliding(poison)) {
            this.character.collectedPoison += 1;
            this.poisons.splice(j, 1);
        }
    }

    /**
     * This function connects the world with the objects in it
     * 
     */
    setWorld() {
        this.character.world = this;
        this.level.world = this;
        this.do.world = this;
        this.enemies.forEach((enemy) => {
            enemy.world = this;
        })
        this.bubbles.forEach((bubble) => {
            bubble.world = this;
        })
        this.poisonBubbles.forEach((poisonBubble) => {
            poisonBubble.world = this;
        })
    }

    /**
     * This function draws the world into the canvas, whit all its parts
     * 
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.isStartScreen()) {
            this.showStartScreen();
        } else if (this.gameOver) {
            this.showGameOverScreen();
        } else if (this.winGame) {
            this.showWinScreen();
        } else if (this.gameStarted) {
            this.drawGame();
            this.drawStatusBars();
        }
        this.animationFrame();
    }

    /**
     * This function always shows the world
     * 
     */
    animationFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This function checks whether the game has not yet started and the start screen must be shown 
     * 
     * @returns false if the game not startet
     */
    isStartScreen() {
        return !this.gameStarted && !this.gameOver && !this.winGame;
    }

    /**
     * This function draw the start screen
     * 
     */
    showStartScreen() {
        this.addToMap(this.startScreen);
        this.addTextToMap('SHARKIE', 400, 320)
        this.addTextToMap('THE GAME', 385, 370)
    }

    /**
     * This function draw the end screen
     * 
     */
    showGameOverScreen() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.endScreenLose);
    }

    /**
     * this function draw the winning screen
     * 
     */
    showWinScreen() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.endScreenWin);
    }

    /**
     * This function is used to draw a array of objects to the map
     * 
     * @param {string} objects This are the array of objects you want to draw
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * This function is used to add the world objects to draw
     * 
     */
    drawGame() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.bubbles);
        this.addObjectsToMap(this.poisonBubbles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.poisons);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * This function draw the status bar of the character
     * 
     */
    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addTextToMap(this.character.energy, 80, 60);
        this.addToMap(this.coinBar);
        this.addTextToMap(this.character.collectedCoins, 220, 60);
        this.addToMap(this.poisonBar);
        this.addTextToMap(this.character.collectedPoison, 310, 60);
    }

    /**
     * This function is used to draw a single object to map
     * 
     * @param {string} mo This is the object you want to draw
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        // Only for developing.
        // mo.drawOuterFrame(this.ctx);
        // mo.drawInnerFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * This function draw text on canvas
     * Its used to draw the statusbar
     * 
     * @param {string} text This is the text you want to draw
     * @param {*} x This is the x-coordinate you want to draw
     * @param {*} y This is the y-coordinate you want to draw
     */
    addTextToMap(text, x, y) {
        this.ctx.fillText(text, x, y);
    }

    /**
     * This function flip the image when you want to move to other direction
     * 
     * @param {string} mo Thats the object you want to flip
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function flips the image back to its original 
     * 
     * @param {string} mo Thats the object you want to flip back
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * This function is used to check that the user dont muted the sounds
     * 
     */
    playMusik() {
        setInterval(() => {
            if (this.gameStarted && !this.muteMusik) {
                this.playGameMusik();
            } else if (this.muteMusik) {
                this.muteAllMusik();
            }
        }, 100);
    }

    /**
     * this function plays the game musik
     * 
     */
    playGameMusik() {
        this.intro_musik.pause();
        this.game_musik.play();
        this.game_musik.volume = 0.3;
        this.game_musik.loop = true;
    }

    /**
     * this function mute all the musik when the user is clicking the mute button
     * 
     */
    muteAllMusik() {
        this.game_musik.pause();
        this.intro_musik.pause();
    }

    /**
     * This function show the touch buttons when you play on mobile
     * 
     */
    showTouchButtons() {
        let arrowsButtons = document.getElementById('arrowsButtons');
        let attackButtons = document.getElementById('attackButtons');
        let topContainer = document.getElementById('topContainer');
        setInterval(() => this.initTouchButtons(arrowsButtons, attackButtons, topContainer), 100);
    }

    /**
     * This function hide the buttons on start and end screen
     * 
     * @param {string} arrowsButtons This is the container for the arrow buttons
     * @param {string} attackButtons This is the container for the attack buttons
     * @param {string} topContainer This is the container for the menu buttons
     */
    initTouchButtons(arrowsButtons, attackButtons, topContainer) {
        if (navigator.maxTouchPoints >= 1) {
            if (this.gameStarted && !this.winGame && !this.gameOver) {
                arrowsButtons.classList.remove('d-none');
                attackButtons.classList.remove('d-none');
            } else if (!this.gameStarted && !this.winGame && !this.gameOver) {
                topContainer.classList.remove('d-none');
            } else if (!this.gameStarted || this.winGame || this.gameOver) {
                arrowsButtons.classList.add('d-none');
                attackButtons.classList.add('d-none');
                topContainer.classList.add('d-none');
            }
        }
    }
}

