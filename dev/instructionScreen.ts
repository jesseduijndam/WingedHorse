// spel uitleg van het spel

class instructionScreen {
    
    private game : Game
    private uitleg : HTMLElement 
    private startGame : HTMLElement 

    constructor ( g: Game) {
        this.game = g 

        let background = document.createElement("startbackground")
        document.body.appendChild(background)

        this.uitleg = document.createElement("uitleg")
        document.body.appendChild(this.uitleg)
        this.uitleg.style.transform = "translate(200px, 200px) scale(1)"
        let num1 = new Tekst(640, 370, 1, "1", g)
        let num2 = new Tekst(830, 370, 1, "2", g)
        let num3 = new Tekst(1010, 370, 1, "3", g)
        let num4 = new Tekst(640, 510, 1, "4", g)
        let num5 = new Tekst(830, 510, 1, "5", g)
        let num6 = new Tekst(1010, 510, 1, "6", g)
        let attack = new Tekst(10, 10, 1, "Attack", g)
        let tame = new Tekst(10, 10, 1, "Tame", g)
        let walk = new Tekst(10, 10, 1, "walk", g)
        let run = new Tekst(10, 10, 1, "run", g)

        this.startGame = document.createElement("startGame")
        document.body.appendChild(this.startGame)
        this.startGame.innerHTML = "NEXT ->"
        this.startGame.addEventListener("click", () => this.naarDeGame());      
    }

    naarDeGame(){
        this.game.playscreen()  
    }
}

