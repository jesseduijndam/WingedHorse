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
class Dragon {
    constructor(x, y, scale) {
        this.dragon = document.createElement("dragon");
        document.body.appendChild(this.dragon);
        this.dragon.id = "drake";
        this.dragon.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        console.log("dragon created");
        this.x = x;
        this.y = y;
        this.scale = scale;
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
        let random = Math.floor(Math.random() * 10);
        if (random <= this.diff) {
            console.log("attack");
            this.x += 50;
            this.dragon.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
            return "attack";
        }
        else {
            console.log("tame");
            this.x -= 50;
            this.dragon.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
            return "tame";
        }
    }
    onHit() {
        console.log("AUW!!!!");
        this.dragon.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }
    onTame(playscreen, g) {
        this.playscreen = playscreen;
        this.game = g;
        this.game.score += 100;
        this.playscreen.naarDeShop();
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
    get Arcade() {
        return this.arcade;
    }
    constructor() {
        this.score = 0;
        this.health = 0;
        this.power = 0;
        this.arcade = new Arcade(this);
        this.joystickListener = (e) => this.initJoystick(e);
        document.addEventListener("joystickcreated", this.joystickListener);
        this.currentscreen = new StartScreen(this);
        document.addEventListener("joystick0button0", () => console.log("FIRE"));
        this.gameLoop();
    }
    gameLoop() {
        this.currentscreen.update();
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
        requestAnimationFrame(() => this.gameLoop());
    }
    startScreen() {
        document.body.innerHTML = "";
        this.scorenMaken();
        this.currentscreen = new StartScreen(this);
    }
    shopscreen() {
        document.body.innerHTML = "";
        this.scorenMaken();
        this.healthMaken();
        this.powerMaken();
        this.currentscreen = new Shop(this);
    }
    playscreen() {
        document.body.innerHTML = "";
        this.scorenMaken();
        this.healthMaken();
        this.powerMaken();
        this.currentscreen = new playscreen(this);
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
class Tekst {
    constructor(x, y, scale, type, g) {
        this.game = g;
        if (type == "naam") {
            this.tekst = document.createElement("naam");
            document.body.appendChild(this.tekst);
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        }
        if (type == "start") {
            this.tekst = document.createElement("start");
            document.body.appendChild(this.tekst);
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            this.tekst.addEventListener("click", () => this.start());
        }
    }
    start() {
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
        this.playscreen = playscreen;
        this.game = g;
        this.player = document.createElement("player");
        document.body.appendChild(this.player);
        this.player.id = "player";
        this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        console.log("player created");
        document.addEventListener('keydown', (e) => this.keyboardInput(e, x, y, scale));
    }
    keyboardInput(event, x, y, scale) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        if (event.keyCode == 37) {
            x -= 10;
            this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            this.playscreen.run();
        }
        else if (event.keyCode == 38) {
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
                    this.nummerdelete();
                    this.action = "test";
                }
            }
        }
        else if (event.keyCode == 39) {
            if (this.check == false) {
                x += 10;
                this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
                this.check = true;
                console.log("move choise making");
                this.action = this.playscreen.dragon.moveChoice(this.game);
            }
            else {
                this.playscreen.die();
                this.nummerdelete();
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
        else if (event.keyCode == 40) {
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
                this.nummerdelete();
            }
        }
        else if (event.keyCode == 87) {
            if (this.buttons[0] == 2 || this.buttons[1] == 2 || this.buttons[2] == 2) {
                this.FAND();
            }
            else {
                this.playscreen.die();
                this.nummerdelete();
            }
        }
        else if (event.keyCode == 69) {
            if (this.buttons[0] == 3 || this.buttons[1] == 3 || this.buttons[2] == 3) {
                this.FAND();
            }
            else {
                this.playscreen.die();
                this.nummerdelete();
            }
        }
        else if (event.keyCode == 65) {
            if (this.buttons[0] == 4 || this.buttons[1] == 4 || this.buttons[2] == 4) {
                this.FAND();
            }
            else {
                this.playscreen.die();
                this.nummerdelete();
            }
        }
        else if (event.keyCode == 83) {
            if (this.buttons[0] == 5 || this.buttons[1] == 5 || this.buttons[2] == 5) {
                this.FAND();
            }
            else {
                this.playscreen.die();
                this.nummerdelete();
            }
        }
        else if (event.keyCode == 68) {
            if (this.buttons[0] == 6 || this.buttons[1] == 6 || this.buttons[2] == 6) {
                this.FAND();
            }
            else {
                this.playscreen.die();
                this.nummerdelete();
            }
        }
    }
    number1() {
        console.log("button 1 player");
        if (this.buttons[0] == 1 || this.buttons[1] == 1 || this.buttons[2] == 1) {
            this.FAND();
        }
        else {
            this.playscreen.die();
            this.nummerdelete();
        }
    }
    number2() {
        if (this.buttons[0] == 2 || this.buttons[1] == 2 || this.buttons[2] == 2) {
            this.FAND();
        }
        else {
            this.playscreen.die();
            this.nummerdelete();
        }
    }
    number3() {
        if (this.buttons[0] == 3 || this.buttons[1] == 3 || this.buttons[2] == 3) {
            this.FAND();
        }
        else {
            this.playscreen.die();
            this.nummerdelete();
        }
    }
    number4() {
        if (this.buttons[0] == 4 || this.buttons[1] == 4 || this.buttons[2] == 4) {
            this.FAND();
        }
        else {
            this.playscreen.die();
            this.nummerdelete();
        }
    }
    number5() {
        if (this.buttons[0] == 5 || this.buttons[1] == 5 || this.buttons[2] == 5) {
            this.FAND();
        }
        else {
            this.playscreen.die();
            this.nummerdelete();
        }
    }
    number6() {
        if (this.buttons[0] == 6 || this.buttons[1] == 6 || this.buttons[2] == 6) {
            this.FAND();
        }
        else {
            this.playscreen.die();
            this.nummerdelete();
        }
    }
    up() {
        console.log(this.action);
        console.log(this.die);
        console.log(this.check);
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
                this.nummerdelete();
                this.action = "test";
            }
        }
    }
    down() {
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
                this.nummerdelete();
                this.action = "test";
            }
        }
    }
    right() {
        if (this.check == false) {
            this.x += 10;
            this.player.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
            this.check = true;
            console.log("move choise making");
            this.action = this.playscreen.dragon.moveChoice(this.game);
        }
        else {
            this.playscreen.die();
            this.nummerdelete();
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
    left() {
        this.x -= 10;
        this.player.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
        this.playscreen.run();
    }
    FAND() {
        this.AND++;
        if (this.AND == 3) {
            this.playscreen.dragon.onHit();
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
        this.dragon = new Dragon(900, 430, 2);
        this.player = new Player(150, 400, 2, this, this.game);
        document.addEventListener("joystick0button0", () => this.player.number1());
        document.addEventListener("joystick0button1", () => this.player.number2());
        document.addEventListener("joystick0button2", () => this.player.number3());
        document.addEventListener("joystick0button3", () => this.player.number4());
        document.addEventListener("joystick0button4", () => this.player.number5());
        document.addEventListener("joystick0button5", () => this.player.number6());
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
                console.log(this.eindScore);
                this.dragon.delete();
                this.player.delete();
                this.player.nummerdelete();
                let eyes = new Eyes(250, 150, 1);
                this.newGame = document.createElement("newGame");
                document.body.appendChild(this.newGame);
                this.newGame.innerHTML = "NEW GAME";
                this.game.score = 0;
                this.newGame.addEventListener("click", () => this.game.startScreen());
            }
        }
    }
    naarDeShop() {
        this.game.power = 0;
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
    }
    naarStart() {
        console.log("start button werkt");
        this.game.playscreen();
    }
    kooptHealth() {
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
    kooptPowerUp() {
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
        else {
            this.bord = document.createElement("bord");
            document.body.appendChild(this.bord);
            this.bord.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            console.log("bordcreated");
        }
    }
}
class StartScreen {
    constructor(g) {
        this.game = g;
        let background = document.createElement("startbackground");
        document.body.appendChild(background);
        let start = new Tekst(625, 670, 1, "start", g);
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
            if (this.buttonPressed(gamepad.buttons[index]) && !this.buttonPressed(this.previousGamepad.buttons[index])) {
                console.log("press");
                document.dispatchEvent(new Event(this.buttonEvents[index]));
            }
            if (this.buttonPressed(gamepad.buttons[this.BUT1]) &&
                this.buttonPressed(gamepad.buttons[this.BUT2]) &&
                (!this.buttonPressed(this.previousGamepad.buttons[this.BUT1]) || !this.buttonPressed(this.previousGamepad.buttons[this.BUT2]))) {
                document.dispatchEvent(new Event('redirect'));
            }
        }
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