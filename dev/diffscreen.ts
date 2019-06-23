class DiffScreen {

    private game : Game
    private nextGame: HTMLElement 
  
   
    constructor( g: Game ) {
        this.game = g
        let background = document.createElement("diffscene")
        document.body.appendChild(background)
       
        let start = new Tekst(625, 290, 3, "easy", g)
        let start1 = new Tekst(625, 390, 3, "medium", g)
        let start2 = new Tekst(625, 490, 3, "hard", g)
        document.addEventListener("joystick0button0", () => this.difficulty(1))
        document.addEventListener("joystick0button1", () => this.difficulty(2))
        document.addEventListener("joystick0button2", () => this.difficulty(3))
    }

    private difficulty(n: number){
        if (this.game.ifactive == "diffscreen") {
            this.game.difficulty = n
            this.game.playscreen()
            console.log("next scene"); 
        }
    }

    public update() {
        
    }

}