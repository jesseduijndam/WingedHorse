// hier komt het spel tegen de dragon

class playscreen {

    private game : Game
    private newGame: HTMLElement 
    private highScoresLijst: HTMLElement
    player : Player
    eindScore: number 
    dragon : Dragon
    sign: Sign
    naardeshop : boolean = false
    private rightcooldown : number = 0
    private upcooldown : number = 0
   
    constructor( g: Game ) {

        this.game = g
        let background = document.createElement("backdrak")
        document.body.appendChild(background)
        this.dragon = new Dragon(500 , 280)
        this.player = new Player(220 , 500, 1, this, this.game)
        this.sign = new Sign(0, 700, 1, 2)
        let tekst = new Tekst(40, 739, 1, "shop(50)", this.game)
        document.addEventListener("joystick0button0", () => this.player.numbers(1))
        document.addEventListener("joystick0button1", () => this.player.numbers(2))
        document.addEventListener("joystick0button2", () => this.player.numbers(3))
        document.addEventListener("joystick0button3", () => this.player.numbers(4))
        document.addEventListener("joystick0button4", () => this.player.numbers(5))
        document.addEventListener("joystick0button5", () => this.player.numbers(6))
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

             //controleren of de score hoger is dan highscore
             if (this.eindScore > this.game.hoogsteHighScore) {
                console.log("oude highscore: " + this.game.hoogsteHighScore)
                this.game.hoogsteHighScore = this.eindScore
                console.log("nieuwe highscore: " + this.game.hoogsteHighScore)
            }

            //highscore tonen op scherm
            this.highScoresLijst = document.createElement("hoogsteHighscore")
            document.body.append(this.highScoresLijst)
            let y = this.game.hoogsteHighScore.toString();
            this.highScoresLijst.innerHTML = "HIGHSCORE: " + y
           
            this.dragon.delete()
            this.player.delete()
            this.player.nummerdelete() 
            this.game.dragonslayed = 0
            //game over afbeelding
            let eyes = new Eyes(280, 150, 1)
            
            //new Game button
            this.newGame = document.createElement("newGame")
            document.body.appendChild(this.newGame)
            this.newGame.innerHTML = "NEW GAME"
            this.newGame.id = "newgame"
            this.game.score = 0;
            this.newGame.addEventListener("click", () => this.game.startScreen() );
            document.addEventListener("joystick0button0", () => this.startscreen())
            document.addEventListener("joystick0button1", () => this.startscreen())
            document.addEventListener("joystick0button2", () => this.startscreen())
            document.addEventListener("joystick0button3", () => this.startscreen())
            document.addEventListener("joystick0button4", () => this.startscreen())
            document.addEventListener("joystick0button5", () => this.startscreen())
             }
         }
     }
    private startscreen(){
        if (this.game.ifactive == "playscreen" && this.player.canrun == false) {
            let elm = document.getElementById("newgame");
            if (elm != undefined) {
              elm.remove();
            }
          this.game.startScreen()  
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