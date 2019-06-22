class StartScreen {

    private game : Game
    private nextGame: HTMLElement 
  
   
    constructor( g: Game ) {
        this.game = g
        let background = document.createElement("startbackground")
        document.body.appendChild(background)
        document.addEventListener("joystick0button0", () => this.deleteeventlistner())
        document.addEventListener("joystick0button1", () => this.deleteeventlistner())
        document.addEventListener("joystick0button2", () => this.deleteeventlistner())
        document.addEventListener("joystick0button3", () => this.deleteeventlistner())
        document.addEventListener("joystick0button4", () => this.deleteeventlistner())
        document.addEventListener("joystick0button5", () => this.deleteeventlistner())
        let start = new Tekst(625, 670, 1, "start", g)

    }
    deleteeventlistner(){
        if (this.game.ifactive == "startscreen") {
            this.game.diffscreen()
        }
        
    }

    public update() {
        
    }

}