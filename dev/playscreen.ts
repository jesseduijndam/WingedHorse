// hier komt het spel tegen de dragon

class playscreen {

    private game : Game
    player : Player
    eindScore: number 
    dragon : Dragon
    sign: Sign
    naardeshop : boolean = false
    private rightcooldown : number = 0
    private upcooldown : number = 0
    private text : Tekst
    private highscorebroken : boolean

    //removing eventlitners
    private callback1 : EventListener
    private callback2 : EventListener
    private callback3 : EventListener
    private callback4 : EventListener
    private callback5 : EventListener
    private callback6 : EventListener

    constructor( g: Game ) {
        this.highscorebroken = false
        this.game = g
        let background = document.createElement("backdrak")
        document.body.appendChild(background)
        this.dragon = new Dragon(500 , 280)
        this.sign = new Sign(0, 700, 1, 2)
        this.text = new Tekst(20, 721, 1, "Shop(50)", this.game)
        this.player = new Player(220 , 500, 1, this, this.game)
        this.callback1 = () => this.player.numbers(1)
        this.callback2 = () => this.player.numbers(2)
        this.callback3 = () => this.player.numbers(3)
        this.callback4 = () => this.player.numbers(4)
        this.callback5 = () => this.player.numbers(5)
        this.callback6 = () => this.player.numbers(6)
        document.addEventListener("joystick0button0", this.callback1)
        document.addEventListener("joystick0button1", this.callback2)
        document.addEventListener("joystick0button2", this.callback3)
        document.addEventListener("joystick0button3", this.callback4)
        document.addEventListener("joystick0button4", this.callback5)
        document.addEventListener("joystick0button5", this.callback6)
    }

    run(){
        // console.log(this.game.currentscreen);
        
        if (this.player.canrun == true && this.naardeshop == false) {
          // console.log("run");
          if (this.game.score >= 50) {
              this.game.score -= 50
              this.naardeshop = true
              this.naarDeShop()
          }  
        }       
     }
 
     die(){
        this.highscorebroken = false
         if (this.player.die == false) {
             if (this.game.health == 1) {
                 this.game.health = 0
                 this.naarDeShop()
             }else{
                document.removeEventListener("joystick0button0", this.callback1)
                document.removeEventListener("joystick0button1", this.callback2)
                document.removeEventListener("joystick0button2", this.callback3)
                document.removeEventListener("joystick0button3", this.callback4)
                document.removeEventListener("joystick0button4", this.callback5)
                document.removeEventListener("joystick0button5", this.callback6)
            this.player.canrun = false
            // console.log("ik ben dood");
            
            this.eindScore = this.game.score;
            if (this.game.difficulty == 1) {
                if (this.eindScore > this.game.hoogsteHighScoreEasy) {
                    this.highscorebroken = true
                    this.game.hoogsteHighScoreEasy = this.eindScore
                    //omzetten naar string
                    let y = this.game.hoogsteHighScoreEasy.toString();
                    //scoreLocalOpslaan
                    localStorage.setItem("opgeslagenHighScoreEasy", y);
                }
            }else if (this.game.difficulty == 2){
            //controleren of de score hoger is dan highscore
                if (this.eindScore > this.game.hoogsteHighScoreMedium) {
                    this.highscorebroken = true
                    this.game.hoogsteHighScoreMedium = this.eindScore
                    //omzetten naar string
                    let y = this.game.hoogsteHighScoreMedium.toString();
                    //scoreLocalOpslaan
                    localStorage.setItem("opgeslagenHighScoreMedium", y);
                }
            }else if (this.game.difficulty == 3){
                //controleren of de score hoger is dan highscore
                    if (this.eindScore > this.game.hoogsteHighScoreHard) {
                        this.highscorebroken = true
                        this.game.hoogsteHighScoreHard = this.eindScore
                        //omzetten naar string
                        let y = this.game.hoogsteHighScoreHard.toString();
                        //scoreLocalOpslaan
                        localStorage.setItem("opgeslagenHighScoreHard", y);
                    }                    
            }
                this.dragon.delete()
                this.player.delete()
                this.sign.delete()
                this.text.delete()
                this.player.nummerdelete() 

                this.game.dragonslayed = 0
                this.game.diescreen(this.highscorebroken)
                
            }
         }
     }

    public naarDeShop(){
        document.removeEventListener("joystick0button0", this.callback1)
        document.removeEventListener("joystick0button1", this.callback2)
        document.removeEventListener("joystick0button2", this.callback3)
        document.removeEventListener("joystick0button3", this.callback4)
        document.removeEventListener("joystick0button4", this.callback5)
        document.removeEventListener("joystick0button5", this.callback6)
        this.game.power = 0
        this.game.dragonslayed ++
        // console.log(this.game.dragonslayed);
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