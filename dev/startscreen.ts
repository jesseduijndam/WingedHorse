class StartScreen {

    private game : Game
    private nextGame: HTMLElement 
  
   
    constructor( g: Game ) {
        this.game = g
        let background = document.createElement("startbackground")
        document.body.appendChild(background)
       
        let start = new Tekst(625, 670, 1, "start", g)
        /*this.game = g

        this.logo = document.createElement("logo")        
        document.body.appendChild(this.logo);

        this.nextGame = document.createElement("nextGame")
        document.body.appendChild(this.nextGame)
        this.nextGame.addEventListener("click", () => this.naarDeGame());*/

    }

    /*public naarDeGame(){
        this.game.playscreen()  
    }*/
}