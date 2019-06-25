class StartScreen {

    private game : Game
    private nextGame: HTMLElement 
    private callback : EventListener
   
    constructor( g: Game ) {
        this.game = g
        let background = document.createElement("startbackground")
        document.body.appendChild(background)

        this.callback =  () => this.deleteeventlistner()
        for (let i = 0; i < 6; i++) {
            document.addEventListener(`joystick0button${i}`, this.callback)
        }
        document.addEventListener("joystick0button0", this.callback)  
        let start = new Tekst(450, 250, 1, "logo", g)

    }
    deleteeventlistner(){
        console.log("removing event listener")
        for (let i = 0; i < 6; i++) {
            document.removeEventListener(`joystick0button${i}`, this.callback)
        }
       
        this.game.diffscreen()

    }

    public update() {
        
    }

}