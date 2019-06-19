class StartScreen {

    private game : Game
    private nextGame: HTMLElement 
  
   
    constructor( g: Game ) {
        this.game = g
        let background = document.createElement("startbackground")
        document.body.appendChild(background)
       
        let start = new Tekst(625, 670, 1, "start", g)

    }

    public update() {
        
    }

}