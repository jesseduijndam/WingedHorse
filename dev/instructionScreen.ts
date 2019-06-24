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
        this.uitleg.innerHTML = "Hier komt de uitleg over het spel"

        this.startGame = document.createElement("startGame")
        document.body.appendChild(this.startGame)
        this.startGame.innerHTML = "NEXT ->"
        this.startGame.addEventListener("click", () => this.naarDeGame());      
    }

    naarDeGame(){
        this.game.playscreen()  
    }
}

