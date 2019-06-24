"use strict";
class Circle extends HTMLElement {
    constructor(joystick) {
        super();
        this.speed = 3;
        this.x = 0;
        this.y = 0;
        this.joystick = joystick;
        this.style.backgroundColor = "red";
        this.style.width = "100px";
        this.style.height = "100px";
        this.style.borderRadius = "50px";
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        document.addEventListener(joystick.ButtonEvents[0], () => this.changeColor());
    }
    changeColor() {
        let color = Math.random() * 360;
        this.style.filter = "hue-rotate(" + color + "deg)";
    }
    update() {
        if (this.joystick.Left)
            this.x -= this.speed;
        if (this.joystick.Right)
            this.x += this.speed;
        if (this.joystick.Up)
            this.y -= this.speed;
        if (this.joystick.Down)
            this.y += this.speed;
        this.draw();
    }
    draw() {
        this.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}
window.customElements.define("circle-component", Circle);
class DiffScreen {
    constructor(g) {
        this.game = g;
        let background = document.createElement("diffscene");
        document.body.appendChild(background);
        let start = new Tekst(625, 290, 3, "easy", g);
        let start1 = new Tekst(625, 390, 3, "medium", g);
        let start2 = new Tekst(625, 490, 3, "hard", g);
        document.addEventListener("joystick0button0", () => this.difficulty(1));
        document.addEventListener("joystick0button1", () => this.difficulty(2));
        document.addEventListener("joystick0button2", () => this.difficulty(3));
    }
    difficulty(n) {
        if (this.game.ifactive == "diffscreen") {
            this.game.difficulty = n;
            this.game.playscreen();
            console.log("next scene");
        }
    }
    update() {
    }
}
class Dragon {
    constructor(x, y) {
        this.dragon = document.createElement("dragon");
        document.body.appendChild(this.dragon);
        this.dragon.id = "drake";
        this.dragon.style.transform = `translate(${x}px, ${y}px) scale(0.7)`;
        console.log("dragon created");
        this.x = x;
        this.y = y;
    }
    moveChoice(g) {
        console.log("move choise made");
        this.game = g;
        if (this.game.power == 1) {
            this.diff = 3;
        }
        else {
            this.diff = 5;
        }
        this.z = Math.floor(this.game.dragonslayed / 10);
        if (this.z == 0 && this.game.difficulty == 1) {
            this.randommax = 10;
        }
        else if (this.game.difficulty == 2) {
            this.randommax = 15;
        }
        else if (this.game.difficulty == 3) {
            this.randommax = 20;
        }
        else {
            this.randommax += 5;
        }
        console.log(this.randommax);
        let random = Math.floor(Math.random() * this.randommax);
        if (random <= this.diff) {
            console.log("attack");
            this.delete();
            this.dragon = document.createElement("dragonattac");
            document.body.appendChild(this.dragon);
            this.dragon.id = "drake";
            let y = this.y - 60;
            this.dragon.style.transform = `translate(${this.x}px, ${y}px) scale(1)`;
            return "attack";
        }
        else {
            console.log("tame");
            this.delete();
            this.dragon = document.createElement("dragontame");
            document.body.appendChild(this.dragon);
            this.dragon.id = "drake";
            let y = this.y + 140;
            this.dragon.style.transform = `translate(${this.x}px, ${y}px) scale(0.7)`;
            return "tame";
        }
    }
    onHit(p) {
        if (p.AND == 3) {
            console.log("AUW!!!!");
            this.delete();
            this.dragon = document.createElement("dragon");
            document.body.appendChild(this.dragon);
            this.dragon.id = "drake";
            this.dragon.style.transform = `translate(${this.x}px, ${this.y}px) scale(0.7)`;
        }
    }
    onTame(playscreen, g) {
        this.playscreen = playscreen;
        this.game = g;
        this.game.score += 100;
        console.log("Ik ben getamed");
    }
    delete() {
        let elm = document.getElementById("drake");
        if (elm != undefined) {
            elm.remove();
        }
    }
}
class Eyes {
    constructor(x, y, scale) {
        this.eyes = document.createElement("eyes");
        document.body.appendChild(this.eyes);
        this.eyes.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }
}
class Game {
    constructor() {
        this.hoogsteHighScoreEasy = 0;
        this.hoogsteHighScoreMedium = 0;
        this.hoogsteHighScoreHard = 0;
        this.dragonslayed = 0;
        this.score = 0;
        this.health = 0;
        this.power = 0;
        this.arcade = new Arcade(this);
        this.joystickListener = (e) => this.initJoystick(e);
        document.addEventListener("joystickcreated", this.joystickListener);
        this.startScreen();
        this.gameLoop();
    }
    get Arcade() {
        return this.arcade;
    }
    gameLoop() {
        for (let joystick of this.arcade.Joysticks) {
            joystick.update();
            if (joystick.Right)
                console.log('RIGHT');
            if (joystick.Up)
                console.log('UP');
            if (joystick.Down)
                console.log('Down');
            if (joystick.Left)
                console.log('Left');
        }
        this.currentscreen.update();
        requestAnimationFrame(() => this.gameLoop());
    }
    startScreen() {
        document.body.innerHTML = "";
        this.currentscreen = new StartScreen(this);
        this.ifactive = "startscreen";
    }
    diffscreen() {
        console.log("diff screen trigger");
        document.body.innerHTML = "";
        this.currentscreen = new DiffScreen(this);
        this.ifactive = "diffscreen";
    }
    shopscreen() {
        document.body.innerHTML = "";
        this.scorenMaken();
        this.healthMaken();
        this.powerMaken();
        this.currentscreen = new Shop(this);
        this.ifactive = "shopscreen";
    }
    playscreen() {
        document.body.innerHTML = "";
        this.scorenMaken();
        this.healthMaken();
        this.powerMaken();
        this.currentscreen = new playscreen(this);
        this.ifactive = "playscreen";
    }
    scorenMaken() {
        this.scoreElement = document.createElement("scoreElement");
        document.body.appendChild(this.scoreElement);
        this.scoreElement.innerHTML = "SCORE: " + this.score;
        console.log("scoreLEement:" + this.score);
    }
    healthMaken() {
        this.healthElement = document.createElement("healthElement");
        document.body.appendChild(this.healthElement);
        if (this.health == 1) {
            this.healthElement.innerHTML = " + health ";
        }
        else {
            console.log("nog geen health");
        }
    }
    powerMaken() {
        this.powerElement = document.createElement("powerElement");
        document.body.appendChild(this.powerElement);
        if (this.power == 1) {
            this.powerElement.innerHTML = " + power ";
        }
        else {
            console.log("nog geen power");
        }
    }
    initJoystick(e) {
        let joystick = this.arcade.Joysticks[e.detail];
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent));
        }
        document.addEventListener(joystick.ButtonEvents[0], () => this.handleJump());
    }
    handleJump() {
        console.log("hello");
    }
    disconnect() {
        document.removeEventListener("joystickcreated", this.joystickListener);
    }
}
window.addEventListener("load", () => new Game());
class instructionScreen {
    constructor(g) {
        this.game = g;
        let background = document.createElement("startbackground");
        document.body.appendChild(background);
        this.uitleg = document.createElement("uitleg");
        document.body.appendChild(this.uitleg);
        this.uitleg.innerHTML = "Hier komt de uitleg over het spel";
        this.startGame = document.createElement("startGame");
        document.body.appendChild(this.startGame);
        this.startGame.innerHTML = "NEXT ->";
        this.startGame.addEventListener("click", () => this.naarDeGame());
    }
    naarDeGame() {
        this.game.playscreen();
    }
}
class Tekst {
    constructor(x, y, scale, type, g) {
        this.game = g;
        if (type == "naam") {
            this.tekst = document.createElement("naam");
            document.body.appendChild(this.tekst);
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        }
        else if (type == "start") {
            this.tekst = document.createElement("start");
            document.body.appendChild(this.tekst);
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            this.tekst.addEventListener("click", () => this.start());
        }
        else if (type == "easy") {
            this.tekst = document.createElement("tekst");
            document.body.appendChild(this.tekst);
            this.tekst.innerHTML = type;
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            this.tekst.addEventListener("click", () => this.easy());
        }
        else if (type == "medium") {
            this.tekst = document.createElement("tekst");
            document.body.appendChild(this.tekst);
            this.tekst.innerHTML = "medium";
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            this.tekst.addEventListener("click", () => this.medium());
        }
        else if (type == "hard") {
            this.tekst = document.createElement("tekst");
            document.body.appendChild(this.tekst);
            this.tekst.innerHTML = "hard";
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            this.tekst.addEventListener("click", () => this.hard());
        }
        else {
            this.tekst = document.createElement("tekst");
            document.body.appendChild(this.tekst);
            this.tekst.innerHTML = type;
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        }
    }
    start() {
        this.game.diffscreen();
        console.log("next scene");
    }
    easy() {
        this.game.difficulty = 1;
        this.game.playscreen();
        console.log("next scene");
    }
    medium() {
        this.game.difficulty = 2;
        this.game.playscreen();
        console.log("next scene");
    }
    hard() {
        this.game.difficulty = 3;
        this.game.playscreen();
        console.log("next scene");
    }
}
class Nummers {
    constructor(x, y, scale, type) {
        this.nummer = document.createElement(`n${type}`);
        document.body.appendChild(this.nummer);
        this.nummer.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        this.nummer.id = `n${type}`;
        console.log("nummercreated");
    }
    delete() {
        this.nummer.style.transform = 'translate(0px, 0px) scale (0)';
    }
}
class Player {
    constructor(x, y, scale, playscreen, g) {
        this.buttons = new Array(2);
        this.check = false;
        this.die = false;
        this.canrun = true;
        this.balls = false;
        this.timer = 0;
        this.playscreen = playscreen;
        this.game = g;
        this.player = document.createElement("player");
        document.body.appendChild(this.player);
        this.player.id = "player";
        this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        console.log("player created");
        document.addEventListener('keydown', (e) => this.keyboardInput(e, x, y, scale));
    }
    update() {
        if (this.game.difficulty == 2) {
            this.timer++;
            if (this.timer == 600) {
                this.playscreen.die();
            }
        }
        else if (this.game.difficulty == 3) {
            this.timer++;
            if (this.timer == 300) {
                this.playscreen.die();
            }
        }
    }
    keyboardInput(event, x, y, scale) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        if (event.keyCode == 37) {
            this.timer = 0;
            x -= 10;
            this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            this.playscreen.run();
        }
        else if (event.keyCode == 38) {
            this.timer = 0;
            if (this.action == "attack" && this.die == false && this.check == true) {
                this.check = false;
                let one = this.buttons[0];
                let two = this.buttons[1];
                let three = this.buttons[2];
                let nummer1 = new Nummers(300, -100, 0.2, one);
                let nummer2 = new Nummers(402.4, -100, 0.2, two);
                let nummer3 = new Nummers(504.8, -100, 0.2, three);
                this.balls = true;
                console.log(this.buttons);
                y -= 10;
                this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
                this.AND = 0;
            }
            else {
                if (this.action != "test" && this.die == false) {
                    this.playscreen.die();
                    this.action = "test";
                }
            }
        }
        else if (event.keyCode == 39) {
            this.timer = 0;
            if (this.canrun == true) {
                if (this.check == false) {
                    x += 10;
                    this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
                    this.check = true;
                    console.log("move choise making");
                    this.action = this.playscreen.dragon.moveChoice(this.game);
                }
                else {
                    this.playscreen.die();
                    this.action = "test";
                }
                if (this.action == "attack") {
                    let number = 0;
                    let arr = [1, 2, 3, 4, 5, 6];
                    let buttons = new Array(2);
                    while (buttons.length == 2) {
                        let multi = arr.length;
                        let random = Math.floor(Math.random() * multi);
                        buttons[number] = arr[random];
                        arr.splice(random, 1);
                        number++;
                    }
                    this.buttons = buttons;
                }
            }
        }
        else if (event.keyCode == 40) {
            this.timer = 0;
            if (this.action == "tame" && this.die == false && this.check == true) {
                this.playscreen.dragon.onTame(this.playscreen, this.game);
                this.canrun = false;
                this.action = "test";
                this.check = false;
                this.playscreen.naarDeShop();
                y += 10;
                this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            }
            else {
                if (this.die == false) {
                    this.playscreen.die();
                    this.nummerdelete();
                    this.action = "test";
                }
            }
        }
        else if (event.keyCode == 81) {
            if (this.buttons[0] == 1 || this.buttons[1] == 1 || this.buttons[2] == 1) {
                this.FAND();
            }
            else {
                this.playscreen.die();
            }
        }
        else if (event.keyCode == 87) {
            if (this.buttons[0] == 2 || this.buttons[1] == 2 || this.buttons[2] == 2) {
                this.FAND();
            }
            else {
                this.playscreen.die();
            }
        }
        else if (event.keyCode == 69) {
            if (this.buttons[0] == 3 || this.buttons[1] == 3 || this.buttons[2] == 3) {
                this.FAND();
            }
            else {
                this.playscreen.die();
            }
        }
        else if (event.keyCode == 65) {
            if (this.buttons[0] == 4 || this.buttons[1] == 4 || this.buttons[2] == 4) {
                this.FAND();
            }
            else {
                this.playscreen.die();
            }
        }
        else if (event.keyCode == 83) {
            if (this.buttons[0] == 5 || this.buttons[1] == 5 || this.buttons[2] == 5) {
                this.FAND();
            }
            else {
                this.playscreen.die();
            }
        }
        else if (event.keyCode == 68) {
            if (this.buttons[0] == 6 || this.buttons[1] == 6 || this.buttons[2] == 6) {
                this.FAND();
            }
            else {
                this.playscreen.die();
            }
        }
    }
    numbers(n) {
        if (this.game.ifactive == "playscreen") {
            console.log(`button ${n} pushed`);
            if (this.buttons[0] == n || this.buttons[1] == n || this.buttons[2] == n) {
                this.FAND();
            }
            else {
                this.playscreen.die();
            }
        }
    }
    up() {
        this.timer = 0;
        if (this.action == "attack" && this.die == false && this.check == true) {
            this.check = false;
            let one = this.buttons[0];
            let two = this.buttons[1];
            let three = this.buttons[2];
            let nummer1 = new Nummers(300, -100, 0.2, one);
            let nummer2 = new Nummers(402.4, -100, 0.2, two);
            let nummer3 = new Nummers(504.8, -100, 0.2, three);
            this.balls = true;
            console.log(this.buttons);
            this.y -= 10;
            this.player.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
            this.AND = 0;
        }
        else {
            if (this.die == false) {
                this.playscreen.die();
                this.action = "test";
            }
        }
    }
    down() {
        this.timer = 0;
        if (this.action == "tame" && this.die == false && this.check == true) {
            this.playscreen.dragon.onTame(this.playscreen, this.game);
            this.canrun = false;
            this.action = "test";
            this.check = false;
            this.playscreen.naarDeShop();
            this.y += 10;
            this.player.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
        }
        else {
            if (this.die == false) {
                this.playscreen.die();
                this.action = "test";
            }
        }
    }
    right() {
        this.timer = 0;
        if (this.canrun == true) {
            if (this.check == false) {
                this.x += 10;
                this.player.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
                this.check = true;
                console.log("move choise making");
                this.action = this.playscreen.dragon.moveChoice(this.game);
            }
            else {
                this.playscreen.die();
                this.action = "test";
            }
            if (this.action == "attack") {
                let number = 0;
                let arr = [1, 2, 3, 4, 5, 6];
                let buttons = new Array(2);
                while (buttons.length == 2) {
                    let multi = arr.length;
                    let random = Math.floor(Math.random() * multi);
                    buttons[number] = arr[random];
                    arr.splice(random, 1);
                    number++;
                }
                this.buttons = buttons;
            }
        }
    }
    left() {
        this.timer = 0;
        this.x -= 10;
        this.player.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
        this.playscreen.run();
    }
    FAND() {
        this.AND++;
        if (this.AND == 3) {
            this.timer = 0;
            this.playscreen.dragon.onHit(this);
            this.nummerdelete();
        }
    }
    nummerdelete() {
        for (let i = 0; i < 3; i++) {
            if (this.balls == true) {
                let elm = document.getElementById(`n${this.buttons[i]}`);
                if (elm != undefined) {
                    elm.remove();
                }
            }
        }
        this.balls = false;
    }
    delete() {
        let elm = document.getElementById("player");
        if (elm != undefined) {
            elm.remove();
        }
        this.die = true;
    }
}
class playscreen {
    constructor(g) {
        this.naardeshop = false;
        this.rightcooldown = 0;
        this.upcooldown = 0;
        this.game = g;
        let background = document.createElement("backdrak");
        document.body.appendChild(background);
        this.dragon = new Dragon(500, 280);
        this.player = new Player(220, 500, 1, this, this.game);
        this.sign = new Sign(0, 700, 1, 2);
        let tekst = new Tekst(40, 739, 1, "shop(50)", this.game);
        document.addEventListener("joystick0button0", () => this.player.numbers(1));
        document.addEventListener("joystick0button1", () => this.player.numbers(2));
        document.addEventListener("joystick0button2", () => this.player.numbers(3));
        document.addEventListener("joystick0button3", () => this.player.numbers(4));
        document.addEventListener("joystick0button4", () => this.player.numbers(5));
        document.addEventListener("joystick0button5", () => this.player.numbers(6));
    }
    run() {
        console.log(this.game.currentscreen);
        if (this.player.canrun == true && this.naardeshop == false) {
            console.log("run");
            if (this.game.score >= 50) {
                this.game.score -= 50;
                this.naardeshop = true;
                this.naarDeShop();
            }
        }
    }
    die() {
        if (this.player.die == false) {
            if (this.game.health == 1) {
                this.game.health = 0;
                this.naarDeShop();
            }
            else {
                this.player.canrun = false;
                console.log("ik ben dood");
                this.eindScore = this.game.score;
                if (this.game.difficulty == 1) {
                    if (this.eindScore > this.game.hoogsteHighScoreEasy) {
                        this.game.hoogsteHighScoreEasy = this.eindScore;
                        let y = this.game.hoogsteHighScoreEasy.toString();
                        localStorage.setItem("opgeslagenHighScoreEasy", y);
                    }
                    this.highScoresLijst = document.createElement("hoogsteHighscore");
                    document.body.append(this.highScoresLijst);
                    let y2 = localStorage.getItem("opgeslagenHighScoreEasy");
                    this.highScoresLijst.innerHTML = "HIGHSCORE: " + y2;
                }
                else if (this.game.difficulty == 2) {
                    if (this.eindScore > this.game.hoogsteHighScoreMedium) {
                        this.game.hoogsteHighScoreMedium = this.eindScore;
                        let y = this.game.hoogsteHighScoreMedium.toString();
                        localStorage.setItem("opgeslagenHighScoreMedium", y);
                    }
                    this.highScoresLijst = document.createElement("hoogsteHighscore");
                    document.body.append(this.highScoresLijst);
                    let y2 = localStorage.getItem("opgeslagenHighScoreMedium");
                    this.highScoresLijst.innerHTML = "HIGHSCORE: " + y2;
                }
                else if (this.game.difficulty == 3) {
                    if (this.eindScore > this.game.hoogsteHighScoreHard) {
                        this.game.hoogsteHighScoreHard = this.eindScore;
                        let y = this.game.hoogsteHighScoreHard.toString();
                        localStorage.setItem("opgeslagenHighScoreHard", y);
                    }
                    this.highScoresLijst = document.createElement("hoogsteHighscore");
                    document.body.append(this.highScoresLijst);
                    let y2 = localStorage.getItem("opgeslagenHighScoreHard");
                    this.highScoresLijst.innerHTML = "HIGHSCORE: " + y2;
                }
                this.dragon.delete();
                this.player.delete();
                this.player.nummerdelete();
                this.game.dragonslayed = 0;
                let eyes = new Eyes(280, 150, 1);
                this.newGame = document.createElement("newGame");
                document.body.appendChild(this.newGame);
                this.newGame.innerHTML = "NEW GAME";
                this.newGame.id = "newgame";
                this.game.score = 0;
                this.newGame.addEventListener("click", () => this.game.startScreen());
                document.addEventListener("joystick0button0", () => this.startscreen());
                document.addEventListener("joystick0button1", () => this.startscreen());
                document.addEventListener("joystick0button2", () => this.startscreen());
                document.addEventListener("joystick0button3", () => this.startscreen());
                document.addEventListener("joystick0button4", () => this.startscreen());
                document.addEventListener("joystick0button5", () => this.startscreen());
            }
        }
    }
    startscreen() {
        if (this.game.ifactive == "playscreen" && this.player.canrun == false) {
            let elm = document.getElementById("newgame");
            if (elm != undefined) {
                elm.remove();
            }
            this.game.startScreen();
        }
    }
    naarDeShop() {
        this.game.power = 0;
        this.game.dragonslayed++;
        console.log(this.game.dragonslayed);
        this.dragon.delete();
        this.player.delete();
        this.player.nummerdelete();
        this.game.shopscreen();
    }
    update() {
        for (const joystick of this.game.Arcade.Joysticks) {
            if (joystick.Left) {
                this.player.left();
            }
            else if (joystick.Right && this.rightcooldown <= 0) {
                this.rightcooldown = 100;
                this.player.right();
            }
            else if (joystick.Up && this.upcooldown <= 0) {
                this.upcooldown = 100;
                this.player.up();
            }
            else if (joystick.Down) {
                this.player.down();
            }
        }
        this.player.update();
        this.rightcooldown--;
        this.upcooldown--;
    }
}
class Shop {
    constructor(g) {
        this.game = g;
        this.waardeHealth = 300;
        this.waardePower = 200;
        this.achtergrond = document.createElement("achtergrondShop");
        document.body.appendChild(this.achtergrond);
        this.health = document.createElement("health");
        this.health.innerHTML = "HEALTH (300)";
        document.body.appendChild(this.health);
        this.health.addEventListener("click", () => this.kooptHealth());
        this.powerUp = document.createElement("powerUp");
        this.powerUp.innerHTML = "POWER UP (200) ";
        document.body.appendChild(this.powerUp);
        this.powerUp.addEventListener("click", () => this.kooptPowerUp());
        this.nextGame = document.createElement("nextGame");
        document.body.appendChild(this.nextGame);
        this.nextGame.addEventListener("click", () => this.naarStart());
        this.message = document.createElement("message");
        document.body.appendChild(this.message);
        document.addEventListener("joystick0button0", () => this.naarStart());
        document.addEventListener("joystick0button1", () => this.kooptHealth());
        document.addEventListener("joystick0button2", () => this.kooptPowerUp());
    }
    naarStart() {
        if (this.game.ifactive == "shopscreen") {
            console.log("start button werkt");
            this.game.playscreen();
        }
    }
    kooptHealth() {
        if (this.game.ifactive == "shopscreen") {
            if (this.game.health == 0) {
                if (this.game.score - this.waardeHealth >= 0) {
                    this.game.health = this.game.health + 1;
                    this.game.score = this.game.score - this.waardeHealth;
                    this.updateScore(this.game.score);
                    let healthElement = document.getElementsByTagName("healthElement")[0];
                    healthElement.innerHTML = "+ Health";
                }
                else {
                    this.message.innerHTML = "Je hebt te weinig geld";
                }
            }
            else {
                this.message.innerHTML = "Je hebt al health";
            }
        }
    }
    kooptPowerUp() {
        if (this.game.ifactive == "shopscreen") {
            if (this.game.power == 0) {
                if (this.game.score - this.waardePower >= 0) {
                    this.game.power = this.game.power + 1;
                    this.game.score = this.game.score - this.waardePower;
                    this.updateScore(this.game.score);
                    let powerElement = document.getElementsByTagName("powerElement")[0];
                    powerElement.innerHTML = "+ Power";
                }
                else {
                    this.message.innerHTML = "Je hebt te weinig geld";
                }
            }
            else {
                this.message.innerHTML = "Je hebt al health";
            }
        }
    }
    updateScore(nieuweScore) {
        let scoreElement = document.getElementsByTagName("scoreElement")[0];
        scoreElement.innerHTML = "SCORE: " + nieuweScore;
    }
    update() {
    }
}
class Sign {
    constructor(x, y, scale, type) {
        if (type == 0) {
            this.sign = document.createElement("sign");
            document.body.appendChild(this.sign);
            this.sign.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            console.log("signcreated");
        }
        else if (type == 1) {
            this.bord = document.createElement("bord");
            document.body.appendChild(this.bord);
            this.bord.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            console.log("bordcreated");
        }
        else if (type == 2) {
            this.bord = document.createElement("back2shop");
            document.body.appendChild(this.bord);
            this.bord.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            console.log("back2shop created");
        }
    }
}
class StartScreen {
    constructor(g) {
        this.game = g;
        let background = document.createElement("startbackground");
        document.body.appendChild(background);
        document.addEventListener("joystick0button0", () => this.deleteeventlistner());
        document.addEventListener("joystick0button1", () => this.deleteeventlistner());
        document.addEventListener("joystick0button2", () => this.deleteeventlistner());
        document.addEventListener("joystick0button3", () => this.deleteeventlistner());
        document.addEventListener("joystick0button4", () => this.deleteeventlistner());
        document.addEventListener("joystick0button5", () => this.deleteeventlistner());
        let start = new Tekst(625, 670, 1, "start", g);
    }
    deleteeventlistner() {
        if (this.game.ifactive == "startscreen") {
            this.game.diffscreen();
        }
    }
    update() {
    }
}
class Arcade {
    constructor(game, mp = false) {
        this.DEBUG = true;
        this.REDIRECT_URL = "http://hr-cmgt.github.io/arcade-server";
        this.multiplayer = false;
        this.game = game;
        this.multiplayer = mp;
        this.joysticks = [];
        if (this.DEBUG)
            this.showStatus("Gamepad is NOT connected. Press a button to connect");
        document.addEventListener("redirect", () => this.onRedirect());
        window.addEventListener("gamepadconnected", (e) => this.onGamePadConnected(e));
        window.addEventListener("gamepaddisconnected", (e) => this.onGamePadDisconnected(e));
    }
    get Joysticks() { return this.joysticks; }
    onRedirect() {
        if (this.DEBUG) {
            console.log('redirect!!');
        }
        window.location.href = this.REDIRECT_URL;
    }
    onGamePadConnected(e) {
        if (this.DEBUG) {
            console.log('Game pad connected');
            console.log("Joystick number: " + e.gamepad.index);
        }
        if ((!this.multiplayer && this.joysticks.length == 0) || this.multiplayer) {
            let joystick = this.createAndAddJoystick(e.gamepad.index, 6);
            joystick.PreviousGamepad = joystick.Gamepad;
            joystick.Gamepad = e.gamepad;
            if (joystick.PreviousGamepad == null) {
                joystick.PreviousGamepad = e.gamepad;
            }
        }
        if (this.DEBUG)
            this.removeStatus();
    }
    onGamePadDisconnected(e) {
        if (this.DEBUG) {
            console.log('Game pad disconnected');
        }
        if (this.DEBUG)
            this.showStatus("Gamepad is NOT connected. Connect the gamepad and press a button.");
        this.removeJoystick(e.gamepad.index);
        this.game.disconnect();
    }
    createAndAddJoystick(joystickNumber, numOfButtons) {
        let joystickCheck = this.getJoystickByNumber(joystickNumber);
        if (joystickCheck != null) {
            return joystickCheck;
        }
        let joystickNew = new Joystick(joystickNumber, numOfButtons, this.DEBUG);
        this.joysticks[joystickNumber] = joystickNew;
        if (joystickNew)
            document.dispatchEvent(new CustomEvent("joystickcreated", { detail: joystickNumber }));
        return joystickNew;
    }
    removeJoystick(joystickNumber) {
        let joystickCheck = this.getJoystickByNumber(joystickNumber);
        if (joystickCheck == null) {
            return;
        }
        var index = this.joysticks.indexOf(joystickCheck);
        this.joysticks[index].destroy();
        if (index > -1) {
            this.joysticks.splice(index, 1);
        }
    }
    getJoystickByNumber(joystickNumber) {
        for (let joystick of this.joysticks) {
            if (joystick.JoystickNumber == joystickNumber) {
                return joystick;
            }
        }
        return null;
    }
    showStatus(content) {
        let container;
        let p;
        if (!(container = document.getElementsByTagName("status")[0])) {
            container = document.createElement("status");
            document.body.append(container);
        }
        if (container) {
            if (!(p = container.getElementsByTagName("p")[0])) {
                p = document.createElement("p");
                container.appendChild(p);
            }
        }
        if (p) {
            p.innerHTML = content;
        }
    }
    removeStatus() {
        let status;
        if (status = document.getElementsByTagName("status")[0]) {
            status.remove();
        }
    }
}
class Joystick {
    constructor(joystickNumber, numOfButtons, debug) {
        this.DEBUG = true;
        this.BUT1 = 8;
        this.BUT2 = 9;
        this.joystickNumber = 0;
        this.numberOfBUttons = 0;
        this.buttonEvents = [];
        this.axes = [];
        this.button = [0, 0, 0, 0, 0, 0];
        this.joystickNumber = joystickNumber;
        this.numberOfBUttons = numOfButtons;
        this.DEBUG = debug;
        for (let i = 0; i < this.numberOfBUttons; i++) {
            this.buttonEvents.push('joystick' + this.JoystickNumber + 'button' + (i));
        }
        if (this.DEBUG) {
            this.debugPanel = new DebugPanel(this, this.numberOfBUttons);
        }
    }
    get Left() { return (this.axes[0] == -1); }
    get Right() { return (this.axes[0] == 1); }
    get Up() { return (this.axes[1] == -1); }
    get Down() { return (this.axes[1] == 1); }
    get Y() { return Math.round(this.axes[1]); }
    get X() { return Math.round(this.axes[0]); }
    get JoystickNumber() { return this.joystickNumber; }
    get ButtonEvents() { return this.buttonEvents; }
    get Gamepad() { return this.gamepad; }
    set Gamepad(gamepad) { this.gamepad = gamepad; }
    get PreviousGamepad() { return this.previousGamepad; }
    set PreviousGamepad(previousGamepad) { this.previousGamepad = previousGamepad; }
    update() {
        let gamepad = navigator.getGamepads()[this.gamepad.index];
        if (gamepad) {
            this.readGamepad(gamepad);
        }
    }
    readGamepad(gamepad) {
        for (let index = 0; index < this.numberOfBUttons; index++) {
            if (this.buttonPressed(gamepad.buttons[index]) && this.buttonPressed(this.previousGamepad.buttons[index])) {
                if (this.button[index] <= 0) {
                    this.button[index] = 100;
                    console.log("press");
                    document.dispatchEvent(new Event(this.buttonEvents[index]));
                }
            }
        }
        this.button[0]--;
        this.button[1]--;
        this.button[2]--;
        this.button[3]--;
        this.button[4]--;
        this.button[5]--;
        this.axes[0] = Math.round(gamepad.axes[0]);
        this.axes[1] = Math.round(gamepad.axes[1]);
        if (this.DEBUG) {
            this.debugPanel.Axes[0] = this.axes[0];
            this.debugPanel.Axes[1] = this.axes[1];
            this.debugPanel.update();
        }
        this.previousGamepad = gamepad;
    }
    buttonPressed(b) {
        if (typeof (b) == "object") {
            return b.pressed;
        }
        return b == 1.0;
    }
    destroy() {
        if (this.DEBUG)
            this.debugPanel.remove();
    }
}
const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    position:           absolute;
    top:                10px;
    right:              10px;
}
root {
    top:                10px;
    right:              10px;
    width:              289px; 
    height:             120px;
    display:            block;
    background-color:   #75a8f77a;
}

root * {
    position:           relative;
}

.button-wrapper, .axes-wrapper {
    display:            flex;
    flex-wrap:          wrap;
    float:              left;
}

root .button-div {
    border: solid 1px black;
    width:              60px;
    margin:             5px;
    padding:            5px;
}

.button-wrapper {
    width:              164px;
}

.axes-wrapper {
    width:              115px;
    margin:             5px;
}

.axes-cell {
    width:              25px;  
    height:             25px; 
    margin:             5px;  
    border:             solid 1px transparent;
}

.axes-cell.direction {
    border:             solid 1px black;
}

.axes-cell.center{
    border:             solid 1px black;
    background-color:   blue;
}
.axes-cell.active{
    background-color:   red;
}
.identifier{
    position:           absolute;
    top:                5px;
    left:               5px;
    width:              auto;
    font-weight:        bold;
    color:              #fff;
}
</style>`;
class DebugPanel extends HTMLElement {
    constructor(joystick, numOfButtons) {
        super();
        this.panelHeight = 120;
        this.panelSpacing = 10;
        this.buttonDivs = [];
        this.Axes = [];
        this.joystick = joystick;
        this.numberOfButtons = numOfButtons;
        let spaceFromTop = this.panelSpacing + (this.joystick.JoystickNumber * (this.panelHeight + this.panelSpacing));
        this.style.top = spaceFromTop + "px";
        this.rootElement = document.createElement('root');
        this.rootElement.style.height = this.panelHeight + "px";
        template.appendChild(this.rootElement);
        let identifier = document.createElement("div");
        identifier.classList.add('identifier');
        identifier.innerHTML = "#" + this.joystick.JoystickNumber;
        this.rootElement.appendChild(identifier);
        this.createHTMLForAxes();
        this.createHTMLForButtons();
        this.createListenersForButtons();
        this.attachShadow({ mode: 'open' });
        if (this.shadowRoot) {
            let temp = template.content.cloneNode(true);
            temp.appendChild(this.rootElement);
            this.shadowRoot.appendChild(temp);
        }
        document.body.appendChild(this);
    }
    createListenersForButtons() {
        for (let i = 0; i < this.numberOfButtons; i++) {
            document.addEventListener(this.joystick.ButtonEvents[i], (e) => this.handleButtonClicks(e, i));
        }
    }
    handleButtonClicks(event, index) {
        console.log(event);
        this.buttonDivs[index].style.filter =
            'hue-rotate(' + (Math.random() * 360) + 'deg)';
    }
    createHTMLForButtons() {
        let buttonWrapper = document.createElement("div");
        buttonWrapper.className = "button-wrapper";
        for (let index = 0; index < this.numberOfButtons; index++) {
            let buttonDiv = document.createElement("div");
            buttonDiv.className = "button-div";
            buttonWrapper.appendChild(buttonDiv);
            buttonDiv.style.backgroundColor = "blue";
            buttonDiv.innerHTML = "Button " + (index + 1);
            this.buttonDivs.push(buttonDiv);
        }
        this.rootElement.appendChild(buttonWrapper);
    }
    createHTMLForAxes() {
        let axesWrapper = document.createElement("div");
        axesWrapper.className = "axes-wrapper";
        for (let i = 1; i <= 9; i++) {
            let cell = document.createElement('div');
            cell.className = "axes-cell";
            if (i % 2 == 0)
                cell.classList.add("direction");
            if (i == 5)
                cell.classList.add("center");
            axesWrapper.appendChild(cell);
            switch (i) {
                case 2:
                    this.up = cell;
                    break;
                case 4:
                    this.left = cell;
                    break;
                case 6:
                    this.right = cell;
                    break;
                case 8:
                    this.down = cell;
                    break;
            }
        }
        this.rootElement.appendChild(axesWrapper);
    }
    update() {
        if (this.Axes[0] == 0) {
            this.left.classList.remove("active");
            this.right.classList.remove("active");
        }
        else {
            if (this.Axes[0] < 0)
                this.left.classList.add("active");
            else if (this.Axes[0] > 0)
                this.right.classList.add("active");
        }
        if (this.Axes[1] == 0) {
            this.up.classList.remove("active");
            this.down.classList.remove("active");
        }
        else {
            if (this.Axes[1] < 0)
                this.up.classList.add("active");
            else if (this.Axes[1] > 0)
                this.down.classList.add("active");
        }
    }
}
window.customElements.define("debug-panel", DebugPanel);
//# sourceMappingURL=main.js.map