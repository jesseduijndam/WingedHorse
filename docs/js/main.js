"use strict";
var Dragon = (function () {
    function Dragon(x, y, scale) {
        this.dragon = document.createElement("dragon");
        document.body.appendChild(this.dragon);
        this.dragon.id = "drake";
        this.dragon.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
        console.log("dragon created");
        this.x = x;
        this.y = y;
        this.scale = scale;
    }
    Dragon.prototype.moveChoice = function () {
        console.log("move choise made");
        var random = Math.floor(Math.random() * 10);
        if (random > 5) {
            console.log("attack");
            this.x += 50;
            this.dragon.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.scale + ")";
            return "attack";
        }
        else {
            console.log("tame");
            this.x -= 50;
            this.dragon.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.scale + ")";
            return "tame";
        }
    };
    Dragon.prototype.onHit = function () {
        console.log("AUW!!!!");
        this.dragon.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.scale + ")";
    };
    Dragon.prototype.onTame = function (playscreen, g) {
        this.playscreen = playscreen;
        this.game = g;
        this.game.score += 100;
        this.playscreen.naarDeShop();
        console.log("Ik ben getamed");
    };
    Dragon.prototype.delete = function () {
        var elm = document.getElementById("drake");
        if (elm != undefined) {
            elm.remove();
        }
    };
    return Dragon;
}());
var Eyes = (function () {
    function Eyes(x, y, scale) {
        this.eyes = document.createElement("eyes");
        document.body.appendChild(this.eyes);
        this.eyes.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
    }
    return Eyes;
}());
var Game = (function () {
    function Game() {
        this.score = 0;
        this.health = 0;
        this.power = 0;
        this.currentscreen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.startScreen = function () {
        document.body.innerHTML = "";
        this.scorenMaken();
        this.currentscreen = new StartScreen(this);
    };
    Game.prototype.shopscreen = function () {
        document.body.innerHTML = "";
        this.scorenMaken();
        this.healthMaken();
        this.powerMaken();
        this.currentscreen = new Shop(this);
    };
    Game.prototype.playscreen = function () {
        document.body.innerHTML = "";
        this.scorenMaken();
        this.healthMaken();
        this.powerMaken();
        this.currentscreen = new playscreen(this);
    };
    Game.prototype.scorenMaken = function () {
        this.scoreElement = document.createElement("scoreElement");
        document.body.appendChild(this.scoreElement);
        this.scoreElement.innerHTML = "SCORE: " + this.score;
        console.log("scoreLEement:" + this.score);
    };
    Game.prototype.healthMaken = function () {
        this.healthElement = document.createElement("healthElement");
        document.body.appendChild(this.healthElement);
        if (this.health == 1) {
            this.healthElement.innerHTML = " + health ";
        }
        else {
            console.log("nog geen health");
        }
    };
    Game.prototype.powerMaken = function () {
        this.powerElement = document.createElement("powerElement");
        document.body.appendChild(this.powerElement);
        if (this.power == 1) {
            this.powerElement.innerHTML = " + power ";
        }
        else {
            console.log("nog geen power");
        }
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Tekst = (function () {
    function Tekst(x, y, scale, type, g) {
        var _this = this;
        this.game = g;
        if (type == "naam") {
            this.tekst = document.createElement("naam");
            document.body.appendChild(this.tekst);
            this.tekst.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
        }
        if (type == "start") {
            this.tekst = document.createElement("start");
            document.body.appendChild(this.tekst);
            this.tekst.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
            this.tekst.addEventListener("click", function () { return _this.start(); });
        }
    }
    Tekst.prototype.start = function () {
        this.game.playscreen();
        console.log("next scene");
    };
    return Tekst;
}());
var Nummers = (function () {
    function Nummers(x, y, scale, type) {
        this.nummer = document.createElement("n" + type);
        document.body.appendChild(this.nummer);
        this.nummer.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
        this.nummer.id = "n" + type;
        console.log("nummercreated");
    }
    Nummers.prototype.delete = function () {
        this.nummer.style.transform = 'translate(0px, 0px) scale (0)';
    };
    return Nummers;
}());
var Player = (function () {
    function Player(x, y, scale, playscreen, g) {
        var _this = this;
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
        this.player.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
        console.log("player created");
        document.addEventListener('keydown', function (e) { return _this.keyboardInput(e, x, y, scale); });
    }
    Player.prototype.keyboardInput = function (event, x, y, scale) {
        if (event.keyCode == 37) {
            x -= 10;
            this.player.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
            this.playscreen.run();
        }
        else if (event.keyCode == 38) {
            if (this.action == "attack" && this.die == false && this.check == true) {
                this.check = false;
                var one = this.buttons[0];
                var two = this.buttons[1];
                var three = this.buttons[2];
                var nummer1 = new Nummers(300, -100, 0.2, one);
                var nummer2 = new Nummers(402.4, -100, 0.2, two);
                var nummer3 = new Nummers(504.8, -100, 0.2, three);
                this.balls = true;
                console.log(this.buttons);
                y -= 10;
                this.player.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
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
                this.player.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
                this.check = true;
                console.log("move choise making");
                this.action = this.playscreen.dragon.moveChoice();
            }
            if (this.action == "attack") {
                var number = 0;
                var arr = [1, 2, 3, 4, 5, 6];
                var buttons = new Array(2);
                while (buttons.length == 2) {
                    var multi = arr.length;
                    var random = Math.floor(Math.random() * multi);
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
                this.playscreen.naarDeShop();
                y += 10;
                this.player.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
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
    };
    Player.prototype.FAND = function () {
        this.AND++;
        if (this.AND == 3) {
            this.playscreen.dragon.onHit();
            this.nummerdelete();
        }
    };
    Player.prototype.nummerdelete = function () {
        for (var i = 0; i < 3; i++) {
            if (this.balls == true) {
                var elm = document.getElementById("n" + this.buttons[i]);
                if (elm != undefined) {
                    elm.remove();
                }
            }
        }
        this.balls = false;
    };
    Player.prototype.delete = function () {
        var elm = document.getElementById("player");
        if (elm != undefined) {
            elm.remove();
        }
        this.die = true;
    };
    return Player;
}());
var playscreen = (function () {
    function playscreen(g) {
        this.naardeshop = false;
        this.game = g;
        var background = document.createElement("backdrak");
        document.body.appendChild(background);
        this.dragon = new Dragon(900, 430, 2);
        this.player = new Player(150, 400, 2, this, this.game);
    }
    playscreen.prototype.run = function () {
        console.log(this.game.currentscreen);
        if (this.player.canrun == true && this.naardeshop == false) {
            console.log("run");
            if (this.game.score >= 50) {
                this.game.score -= 50;
                this.naardeshop = true;
                this.naarDeShop();
            }
        }
    };
    playscreen.prototype.die = function () {
        var _this = this;
        if (this.player.die == false) {
            this.player.canrun = false;
            console.log("ik ben dood");
            this.eindScore = this.game.score;
            console.log(this.eindScore);
            this.dragon.delete();
            this.player.delete();
            this.player.nummerdelete();
            var eyes = new Eyes(250, 150, 1);
            this.newGame = document.createElement("newGame");
            document.body.appendChild(this.newGame);
            this.newGame.innerHTML = "NEW GAME";
            this.game.score = 0;
            this.newGame.addEventListener("click", function () { return _this.game.startScreen(); });
        }
    };
    playscreen.prototype.naarDeShop = function () {
        this.dragon.delete();
        this.player.delete();
        this.player.nummerdelete();
        this.game.shopscreen();
    };
    playscreen.prototype.update = function () {
    };
    return playscreen;
}());
var Shop = (function () {
    function Shop(g) {
        var _this = this;
        this.game = g;
        this.waardeHealth = 300;
        this.waardePower = 200;
        this.achtergrond = document.createElement("achtergrondShop");
        document.body.appendChild(this.achtergrond);
        this.health = document.createElement("health");
        this.health.innerHTML = "HEALTH (300)";
        document.body.appendChild(this.health);
        this.health.addEventListener("click", function () { return _this.kooptHealth(); });
        this.powerUp = document.createElement("powerUp");
        this.powerUp.innerHTML = "POWER UP (200) ";
        document.body.appendChild(this.powerUp);
        this.powerUp.addEventListener("click", function () { return _this.kooptPowerUp(); });
        this.nextGame = document.createElement("nextGame");
        document.body.appendChild(this.nextGame);
        this.nextGame.addEventListener("click", function () { return _this.naarStart(); });
        this.message = document.createElement("message");
        document.body.appendChild(this.message);
    }
    Shop.prototype.naarStart = function () {
        console.log("start button werkt");
        this.game.playscreen();
    };
    Shop.prototype.kooptHealth = function () {
        if (this.game.health == 0) {
            if (this.game.score - this.waardeHealth > 0) {
                this.game.health = this.game.health + 1;
                this.game.score = this.game.score - this.waardeHealth;
                this.updateScore(this.game.score);
                var healthElement = document.getElementsByTagName("healthElement")[0];
                healthElement.innerHTML = "+ Health";
            }
            else {
                this.message.innerHTML = "Je hebt te weinig geld";
            }
        }
        else {
            this.message.innerHTML = "Je hebt al health";
        }
    };
    Shop.prototype.kooptPowerUp = function () {
        if (this.game.power == 0) {
            if (this.game.score - this.waardePower > 0) {
                this.game.power = this.game.power + 1;
                this.game.score = this.game.score - this.waardePower;
                this.updateScore(this.game.score);
                var powerElement = document.getElementsByTagName("powerElement")[0];
                powerElement.innerHTML = "+ Power";
            }
            else {
                this.message.innerHTML = "Je hebt te weinig geld";
            }
        }
        else {
            this.message.innerHTML = "Je hebt al health";
        }
    };
    Shop.prototype.updateScore = function (nieuweScore) {
        var scoreElement = document.getElementsByTagName("scoreElement")[0];
        scoreElement.innerHTML = "SCORE: " + nieuweScore;
    };
    return Shop;
}());
var Sign = (function () {
    function Sign(x, y, scale, type) {
        if (type == 0) {
            this.sign = document.createElement("sign");
            document.body.appendChild(this.sign);
            this.sign.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
            console.log("signcreated");
        }
        else {
            this.bord = document.createElement("bord");
            document.body.appendChild(this.bord);
            this.bord.style.transform = "translate(" + x + "px, " + y + "px) scale(" + scale + ")";
            console.log("bordcreated");
        }
    }
    return Sign;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        this.game = g;
        var background = document.createElement("startbackground");
        document.body.appendChild(background);
        var start = new Tekst(625, 670, 1, "start", g);
    }
    return StartScreen;
}());
//# sourceMappingURL=main.js.map