// spel uitleg van het spel

class instructionScreen {
    
    private game : Game
    private uitleg : HTMLElement 
    private startGame : HTMLElement
    private callback : EventListener 

    constructor ( g: Game) {
        this.game = g 

        let background = document.createElement("startbackground")
        document.body.appendChild(background)

        // de uitleg
        this.uitleg = document.createElement("uitleg")
        document.body.appendChild(this.uitleg)
        this.uitleg.style.transform = "translate(200px, 240px) scale(1)"
        let num1 = new Tekst(640, 410, 1, "1", g)
        let num2 = new Tekst(830, 410, 1, "2", g)
        let num3 = new Tekst(1010, 410, 1, "3", g)
        let num4 = new Tekst(640, 550, 1, "4", g)
        let num5 = new Tekst(830, 550, 1, "5", g)
        let num6 = new Tekst(1010, 550, 1, "6", g)
        let attack = new Tekst(200, 200, 1, "Attack", g)
        let tame = new Tekst(240, 600, 1, "Tame", g)
        let walk = new Tekst(400, 400, 1, "walk", g)
        let run = new Tekst(100, 400, 1, "run", g)
        let any = new Tekst(400, 10, 1, "press any button", g)
        let dragonattack = document.createElement("dragonattac")
        document.body.appendChild(dragonattack)
        dragonattack.style.transform = `translate(-50px, -260px) scale(0.3)`
        let dragon = document.createElement("dragon")
        document.body.appendChild(dragon)
        dragon.style.transform = `translate(0px, -65px) scale(0.3)`
        let dragontame = document.createElement("dragontame")
        document.body.appendChild(dragontame)
        dragontame.style.transform = `translate(-250px, 410px) scale(0.3)`

        // de eventlistner
        this.callback =  () => this.naarDeGame()
        for (let i = 0; i < 6; i++) {
            document.addEventListener(`joystick0button${i}`, this.callback)
        }

        this.startGame = document.createElement("startGame")
        document.body.appendChild(this.startGame)
        this.startGame.innerHTML = "NEXT ->"
        this.startGame.addEventListener("click", () => this.naarDeGame());      
    }

    naarDeGame(){
        for (let i = 0; i < 6; i++) {
            document.removeEventListener(`joystick0button${i}`, this.callback)
        }
        this.game.playscreen()  
    }

    update(){
        
    }
}

