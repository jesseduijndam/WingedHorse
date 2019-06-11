// hier komt het spel tegen de dragon

class playscreen {

    private game : Game
    private newGame: HTMLElement 
    player : Player
    eindScore: number 
    dragon : Dragon
    naardeshop : boolean = false
   
    constructor( g: Game ) {

        this.game = g
        let background = document.createElement("backdrak")
        document.body.appendChild(background)
        this.dragon = new Dragon(900 , 430, 2)
        this.player = new Player(150 , 400, 2, this, this.game)
    }

    run(){
        console.log(this.game.currentscreen);
        
        if (this.player.canrun == true && this.naardeshop == false) {
          console.log("run");
          if (this.game.score >= 50) {
              this.game.score -= 50
              this.naardeshop = true
              this.naarDeShop()
          }  
        }       
     }
 
     die(){
         if (this.player.die == false) {
            this.player.canrun = false
            console.log("ik ben dood");

            this.eindScore = this.game.score;
            console.log(this.eindScore);
           
            this.dragon.delete()
            this.player.delete()
            this.player.nummerdelete()

            //game over afbeelding
            let eyes = new Eyes(250, 150, 1)
            
            //new Game button
            this.newGame = document.createElement("newGame")
            document.body.appendChild(this.newGame)
            this.newGame.innerHTML = "NEW GAME"
            this.game.score = 0;
            this.newGame.addEventListener("click", () => this.game.startScreen() );
         }
     }

    public naarDeShop(){
        this.dragon.delete()
        this.player.delete()
        this.player.nummerdelete()
        this.game.shopscreen()  
    }

    public update(){
    }

}