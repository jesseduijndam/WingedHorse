// hier komt het spel tegen de dragon

class playscreen {

    private game : Game
    private newGame: HTMLElement 
    player : Player
    eindScore: number 
    dragon : Dragon
    naardeshop : boolean = false
    private rightcooldown : number = 0
    private upcooldown : number = 0
   
    constructor( g: Game ) {

        this.game = g
        let background = document.createElement("backdrak")
        document.body.appendChild(background)
        this.dragon = new Dragon(900 , 430, 2)
        this.player = new Player(150 , 400, 2, this, this.game)
        document.addEventListener("joystick0button0", () => this.player.number1())
        document.addEventListener("joystick0button1", () => this.player.number2())
        document.addEventListener("joystick0button2", () => this.player.number3())
        document.addEventListener("joystick0button3", () => this.player.number4())
        document.addEventListener("joystick0button4", () => this.player.number5())
        document.addEventListener("joystick0button5", () => this.player.number6())
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
             if (this.game.health == 1) {
                 this.game.health = 0
                 this.naarDeShop()
             }else{
            this.player.canrun = false
            console.log("ik ben dood");

            this.eindScore = this.game.score;
            console.log(this.eindScore);
           
            this.dragon.delete()
            this.player.delete()
            this.player.nummerdelete()
            this.game.dragonslayed = 0
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
     }

    public naarDeShop(){
        this.game.power = 0
        this.game.dragonslayed ++
        console.log(this.game.dragonslayed);
        this.dragon.delete()
        this.player.delete()
        this.player.nummerdelete()
        this.game.shopscreen()  
    }

    public update(){
        for (const joystick of this.game.Arcade.Joysticks) {
            if(joystick.Left){
                this.player.left()
            }else if (joystick.Right && this.rightcooldown <= 0){
                this.rightcooldown = 100
                this.player.right()
            }else if (joystick.Up && this.upcooldown <= 0){
                this.upcooldown = 100
                this.player.up()
            }else if (joystick.Down){
                this.player.down()
            }
        }
        this.player.update()
    
        this.rightcooldown--
        this.upcooldown--
    }
}