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
    //moet in de player.ts
    moveChoice() {
        console.log("move choise made");
        let random = Math.floor(Math.random() * 10);
        if (random > 5) {
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
    //geeft door aan hier en verplaatst met functie naar achter nr voor of anders
    onHit() {
        console.log("AUW!!!!");
        this.dragon.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`;
    }
    onTame() {
        console.log("Ik ben getamed");
    }
    delete() {
        let elm = document.getElementById("drake");
        document.body.removeChild(elm);
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
        console.log("game created");
        //this.startscene()  
        this.playscreen();
    }
    startscene() {
        let background = document.createElement("startbackground");
        document.body.appendChild(background);
        let sign = new Sign(260, 150, 1, 0);
        let name = new Tekst(430, 250, 1, "naam");
        let sign2 = new Sign(365, 600, 0.5, 1);
        let start = new Tekst(625, 670, 1, "start");
    }
    playscreen() {
        let background = document.createElement("backdrak");
        document.body.appendChild(background);
        this.dragon = new Dragon(900, 430, 2);
        this.player = new Player(150, 400, 2, this);
    }
    run() {
        if (this.player.canrun == true) {
            console.log("run");
        }
    }
    die() {
        if (this.player.die == false) {
            this.player.canrun = false;
            console.log("ik ben dood");
            this.dragon.delete();
            this.player.delete();
            let eyes = new Eyes(450, 150, 1);
        }
    }
}
window.addEventListener("load", () => new Game());
class Tekst {
    constructor(x, y, scale, type) {
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
    constructor(x, y, scale, game) {
        this.buttons = new Array(2);
        this.check = false;
        this.die = false;
        this.canrun = true;
        this.balls = false;
        this.game = game;
        this.player = document.createElement("player");
        document.body.appendChild(this.player);
        this.player.id = "player";
        this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        console.log("player created");
        document.addEventListener('keydown', (e) => this.keyboardInput(e, x, y, scale));
    }
    keyboardInput(event, x, y, scale) {
        // PRESS LEFT ARROW
        if (event.keyCode == 37) {
            x -= 10;
            this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            this.game.run();
        }
        // PRESS UP ARROW attack
        else if (event.keyCode == 38) {
            if (this.action == "attack" && this.die == false) {
                this.check = false;
                let one = this.buttons[0];
                let two = this.buttons[1];
                let three = this.buttons[2];
                let nummer1 = new Nummers(300, -100, 0.2, one);
                let nummer2 = new Nummers(402.4, -100, 0.2, two);
                let nummer3 = new Nummers(504.8, -100, 0.2, three);
                this.balls = true;
                console.log(this.buttons);
                //WORD EEN ANIMATIE OF ANDER PLAATJE NU NOG NIET
                y -= 10;
                this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
                this.AND = 0;
            }
            else {
                // draak vermoord je wilde getemd worden kan mooier maar voor nu nr de die scene
                if (this.die == false) {
                    this.game.die();
                    this.nummerdelete();
                    this.action = "test";
                }
            }
        }
        // PRESS RIGHT ARROW start its move
        else if (event.keyCode == 39) {
            if (this.check == false) {
                x += 10;
                this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
                this.check = true;
                console.log("move choise making");
                this.action = this.game.dragon.moveChoice();
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
        // PRESS DOWN ARROW tame
        else if (event.keyCode == 40) {
            if (this.action == "tame" && this.die == false) {
                this.check = false;
                this.game.dragon.onTame();
                //WORD EEN ANIMATIE OF ANDER PLAATJE NU NOG NIET
                y += 10;
                this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            }
            else {
                // draak vermoord je wilde getemd worden kan mooier maar voor nu nr de die scene
                if (this.die == false) {
                    this.game.die();
                    this.nummerdelete();
                    this.action = "test";
                }
            }
        }
        //Q
        else if (event.keyCode == 81) {
            if (this.buttons[0] == 1 || this.buttons[1] == 1 || this.buttons[2] == 1) {
                this.FAND();
            }
            else {
                this.game.die();
                this.nummerdelete();
            }
        }
        //W
        else if (event.keyCode == 87) {
            if (this.buttons[0] == 2 || this.buttons[1] == 2 || this.buttons[2] == 2) {
                this.FAND();
            }
            else {
                this.game.die();
                this.nummerdelete();
            }
        }
        //E
        else if (event.keyCode == 69) {
            if (this.buttons[0] == 3 || this.buttons[1] == 3 || this.buttons[2] == 3) {
                this.FAND();
            }
            else {
                this.game.die();
                this.nummerdelete();
            }
        }
        //A
        else if (event.keyCode == 65) {
            if (this.buttons[0] == 4 || this.buttons[1] == 4 || this.buttons[2] == 4) {
                this.FAND();
            }
            else {
                this.game.die();
                this.nummerdelete();
            }
        }
        //S
        else if (event.keyCode == 83) {
            if (this.buttons[0] == 5 || this.buttons[1] == 5 || this.buttons[2] == 5) {
                this.FAND();
            }
            else {
                this.game.die();
                this.nummerdelete();
            }
        }
        //D
        else if (event.keyCode == 68) {
            if (this.buttons[0] == 6 || this.buttons[1] == 6 || this.buttons[2] == 6) {
                this.FAND();
            }
            else {
                this.game.die();
                this.nummerdelete();
            }
        }
        /*
        //PRESS SPACE BAR
        else if (event.keyCode == 32) {
          window.alert("Space Key Pressed");
        }
        */
    }
    FAND() {
        this.AND++;
        if (this.AND == 3) {
            this.game.dragon.onHit();
            this.nummerdelete();
        }
    }
    nummerdelete() {
        for (let i = 0; i < 3; i++) {
            if (this.balls == true) {
                let elm = document.getElementById(`n${this.buttons[i]}`);
                document.body.removeChild(elm);
            }
        }
        this.balls = false;
    }
    delete() {
        let elm = document.getElementById("player");
        document.body.removeChild(elm);
        this.die = true;
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
//# sourceMappingURL=main.js.map