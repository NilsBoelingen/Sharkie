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
    retryButton = new RetryButton();
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

    constructor(canvas, keyboard) {
        this.setCanvas(canvas, keyboard);
        this.draw();
        this.run();
        this.setWorld();
        this.playMusik();
        this.showTouchButtons();
    }

    setCanvas(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx.font = 'bold 40px Arial';
        this.ctx.fillStyle = 'white';
    }

    run() {
        setStopableInterval(() => {
            this.checkCollisions();
        }, 200);
    }

    startGame() {
        if (this.canStartGamewhitTouch()) {
            this.gameStarted = true;
        } else if (this.canRetryGameOverwhitTouch()) {
            location.reload();
        } else if (this.canRetryWinWhitTouch()) {
            location.reload();
        }
    }

    canStartGame() {
        return this.checkMouseClickCollision(this.startButton) && this.keyboard.LEFT_CLICK && !this.gameOver && !this.winGame;
    }

    canRetryGameOver() {
        return this.checkMouseClickCollision(this.retryButton) && this.keyboard.LEFT_CLICK && this.gameOver && !this.winGame;
    }

    canRetryWin() {
        return this.checkMouseClickCollision(this.retryButton) && this.keyboard.LEFT_CLICK && !this.gameOver && this.winGame;
    }

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

    checkColissionEnemy(enemy) {
        if (this.character.isColliding(enemy) && !this.keyboard.SPACE) {
            this.character.characterGetHit(enemy);
        } else if (this.character.isAttacking(enemy) && this.keyboard.SPACE) {
            this.character.enemyGetHit(enemy);
        }
    }

    checkColissionBubble(enemy, k) {
        k = 0;
        this.bubbles.forEach((bubble) => {
            this.isJellyFish(bubble, enemy, k);
            k++;
        });
    }

    isJellyFish(bubble, enemy, k) {
        if (enemy.isColliding(bubble) && enemy instanceof JellyFish) {
            enemy.energy = 0;
            this.bubbles.splice(k, 1);
            enemy.animate();
        };
    }

    checkColissionPoisonBubble(enemy, l) {
        l = 0;
        this.poisonBubbles.forEach((poisonBubble) => {
            this.isEndboss(poisonBubble, enemy, l);
            l++;
        });
    }

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

    isEnemyDead(enemy) {
        if (enemy.isDead()) {
            enemy.changeOffset(enemy);
        };
    }

    checkColissionCoin(coin, i) {
        if (this.character.isColliding(coin)) {
            this.character.collectedCoins += 1;
            this.coins.splice(i, 1);
            console.log(i)
        };
    }

    checkColissionPoison(poison, j) {
        if (this.character.isColliding(poison)) {
            this.character.collectedPoison += 1;
            this.poisons.splice(j, 1);
        }
    }

    setWorld() {
        this.character.world = this;
        this.level.world = this;
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

    animationFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    isStartScreen() {
        return !this.gameStarted && !this.gameOver && !this.winGame;
    }

    showStartScreen() {
        this.addToMap(this.startScreen);
        this.addTextToMap('SHARKIE', 400, 320)
        this.addTextToMap('THE GAME', 385, 370)
    }

    showGameOverScreen() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.endScreenLose);
        this.addToMap(this.retryButton);
    }

    showWinScreen() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.endScreenWin);
        this.addToMap(this.retryButton);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

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

    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addTextToMap(this.character.energy, 80, 60);
        this.addToMap(this.coinBar);
        this.addTextToMap(this.character.collectedCoins, 220, 60);
        this.addToMap(this.poisonBar);
        this.addTextToMap(this.character.collectedPoison, 310, 60);
    }

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

    addTextToMap(text, x, y) {
        this.ctx.fillText(text, x, y);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    playMusik() {
        setInterval(() => {
            if (!this.gameStarted && !this.muteMusik) {
                this.playIntroMusik();
            } else if (this.gameStarted && !this.muteMusik) {
                this.playGameMusik();
            } else if (this.muteMusik) {
                this.muteAllMusik();
            }
        }, 100);
    }

    playIntroMusik() {
        this.game_musik.pause();
        this.intro_musik.play();
        this.intro_musik.volume = 0.3;
        this.intro_musik.loop = true;
    }

    playGameMusik() {
        this.intro_musik.pause();
        this.game_musik.play();
        this.game_musik.volume = 0.3;
        this.game_musik.loop = true;
    }

    muteAllMusik() {
        this.game_musik.pause();
        this.intro_musik.pause();
    }

    showTouchButtons() {
        let arrowsButtons = document.getElementById('arrowsButtons');
        let attackButtons = document.getElementById('attackButtons');
        setInterval(() => this.initTouchButtons(arrowsButtons), 100);
    }

    initTouchButtons(arrowsButtons) {
        if (navigator.maxTouchPoints >= 1) {
            if (this.gameStarted) {
                arrowsButtons.classList.remove('d-none');
                attackButtons.classList.remove('d-none');
            } 
        } else {
            arrowsButtons.classList.add('d-none');
            attackButtons.classList.add('d-none');
        }
    }
}

