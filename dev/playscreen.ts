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

    //removing eventlitners
    private callback1 : EventListener
    private callback2 : EventListener
    private callback3 : EventListener
    private callback4 : EventListener
    private callback5 : EventListener
    private callback6 : EventListener
    private callbackstart : EventListener

    constructor( g: Game ) {

        this.game = g
        let background = document.createElement("backdrak")
        document.body.appendChild(background)
        this.dragon = new Dragon(500 , 280)
        this.player = new Player(220 , 500, 1, this, this.game)
        this.sign = new Sign(0, 600, 1, 2)
        let tekst = new Tekst(13, 628, 0.9, "shop(50)", this.game)
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
                document.removeEventListener("joystick0button0", this.callback1)
                document.removeEventListener("joystick0button1", this.callback2)
                document.removeEventListener("joystick0button2", this.callback3)
                document.removeEventListener("joystick0button3", this.callback4)
                document.removeEventListener("joystick0button4", this.callback5)
                document.removeEventListener("joystick0button5", this.callback6)
            this.player.canrun = false
            console.log("ik ben dood");

            this.eindScore = this.game.score;
            if (this.game.difficulty == 1) {
                if (this.eindScore > this.game.hoogsteHighScoreEasy) {

                    this.game.hoogsteHighScoreEasy = this.eindScore
                    //omzetten naar string
                    let y = this.game.hoogsteHighScoreEasy.toString();
                    //scoreLocalOpslaan
                    localStorage.setItem("opgeslagenHighScoreEasy", y);
                }
    
                //highscore tonen op scherm
                this.highScoresLijst = document.createElement("hoogsteHighscore")
                document.body.append(this.highScoresLijst)
         
                let y2 = localStorage.getItem("opgeslagenHighScoreEasy")
                this.highScoresLijst.innerHTML = "HIGHSCORE: " + y2
            }else if (this.game.difficulty == 2){
            //controleren of de score hoger is dan highscore
                if (this.eindScore > this.game.hoogsteHighScoreMedium) {

                    this.game.hoogsteHighScoreMedium = this.eindScore
                    //omzetten naar string
                    let y = this.game.hoogsteHighScoreMedium.toString();
                    //scoreLocalOpslaan
                    localStorage.setItem("opgeslagenHighScoreMedium", y);
                }

                //highscore tonen op scherm
                this.highScoresLijst = document.createElement("hoogsteHighscore")
                document.body.append(this.highScoresLijst)
        
                let y2 = localStorage.getItem("opgeslagenHighScoreMedium")
                this.highScoresLijst.innerHTML = "HIGHSCORE: " + y2
            }else if (this.game.difficulty == 3){
                //controleren of de score hoger is dan highscore
                    if (this.eindScore > this.game.hoogsteHighScoreHard) {
    
                        this.game.hoogsteHighScoreHard = this.eindScore
                        //omzetten naar string
                        let y = this.game.hoogsteHighScoreHard.toString();
                        //scoreLocalOpslaan
                        localStorage.setItem("opgeslagenHighScoreHard", y);
                    }
    
                    //highscore tonen op scherm
                    this.highScoresLijst = document.createElement("hoogsteHighscore")
                    document.body.append(this.highScoresLijst)
            
                    let y2 = localStorage.getItem("opgeslagenHighScoreHard")
                    this.highScoresLijst.innerHTML = "HIGHSCORE: " + y2
            }
           
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
                this.callbackstart = () => this.startscreen()
                for (let i = 0; i < 6; i++) {
                    document.addEventListener(`joystick0button${i}`, this.callbackstart)
                }
            }
         }
     }
    private startscreen(){
        for (let i = 0; i < 6; i++) {
            document.removeEventListener(`joystick0button${i}`, this.callbackstart)
        }
            let elm = document.getElementById("newgame");
            if (elm != undefined) {
              elm.remove();
            }
          this.game.startScreen()  
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