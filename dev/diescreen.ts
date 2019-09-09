class Diescreen {
    private game:Game
    private newGame: HTMLElement 
    private callbackstart : EventListener 
    private callbackname : EventListener
    private highScoresLijst: HTMLElement
    private middle: HTMLElement
    private last: HTMLElement | null
    private alphabet:Array<string> = ("abcdefghijklmnopqrstuvwxyz1234567890").split("");
    private alphabetwhere:Array<number> = []
    private eindletters: Array<string> = []
    private letteractive : number = 0
    private eventlistneractive : boolean = true
    private background: HTMLElement;
    private timeoutup: number = 0
    private timeoutdown: number = 0
    private timeoutright: number = 0
    private timeoutleft: number = 0
    
    constructor(g:Game, h:boolean) {
        this.game = g        
        this.callbackname = () => this.settingname()
        this.background = document.createElement("backdrak")
        document.body.appendChild(this.background)
        this.middle = document.createElement("middle")
        document.body.appendChild(this.middle)
        if (h == true) {
            for (let i = 0; i < 6; i++) {
                document.addEventListener(`joystick0button${i}`, this.callbackname)
            }
            document.addEventListener('keydown', (e) => this.keyboardInput(e))
            
            this.namenotset()

        }else{
            this.nameset()
        }
        
    }

    private namenotset(){
        for (let i = 0; i < 3; i++) {
            let letter = document.createElement("highname")
            this.middle.appendChild(letter)
            letter.innerHTML = this.alphabet[0]
            letter.id = i.toString()
            
            this.eindletters.push(this.alphabet[0])
            this.alphabetwhere.push(0) 
        }
    }

    private letterup(){
        let elm = document.getElementById(this.letteractive.toString());
        if (this.alphabetwhere[this.letteractive] >= (this.alphabet.length - 1)) {
            this.alphabetwhere[this.letteractive] = 0
        }else{
            this.alphabetwhere[this.letteractive]++
        }
        this.eindletters[this.letteractive] = this.alphabet[this.alphabetwhere[this.letteractive]]
        if (elm != undefined) {
            elm.innerHTML = this.eindletters[this.letteractive]
          }
    }

    private letterdown(){
        let elm = document.getElementById(this.letteractive.toString());        
        if (this.alphabetwhere[this.letteractive] <= 0 ) {
            this.alphabetwhere[this.letteractive] = 35
        }else{
            this.alphabetwhere[this.letteractive]--
        }
        this.eindletters[this.letteractive] = this.alphabet[this.alphabetwhere[this.letteractive]]
        if (elm != undefined) {
            elm.innerHTML = this.eindletters[this.letteractive]
          }
    }

    private addletter(){
        this.letteractive++
        console.log(this.eindletters.length);
        
        if (this.alphabetwhere.length <= this.letteractive && this.eindletters.length !<= 19) {
            let letter = document.createElement("highname")
            this.middle.appendChild(letter)
            letter.innerHTML = this.alphabet[0]
            letter.id = this.letteractive.toString()
            this.eindletters.push(this.alphabet[0])
            this.alphabetwhere.push(0) 
        }
    }

    private letterback(){
        this.letteractive--
    }

    private settingname(){
        this.eventlistneractive = false
        for (let i = 0; i < 6; i++) {
            document.addEventListener(`joystick0button${i}`, this.callbackname)
        }
        for (let i = 0; i < this.eindletters.length; i++) {
            let elm = document.getElementById(i.toString())
            if (elm != undefined) {
                elm.remove()
            }
        }
        if (this.game.difficulty == 1) {
            let y = this.eindletters.join("")            
            localStorage.setItem("nameHighScoreEasy", y)
            this.nameset()
        }else if (this.game.difficulty == 2){
            let y = this.eindletters.join("")
            localStorage.setItem("nameHighScoreMedium", y)
            this.nameset()
        }else if (this.game.difficulty == 3){
            let y = this.eindletters.join("")
            localStorage.setItem("nameHighScoreHard", y)
            this.nameset()
        }
    }

    private nameset(){
        let darken = document.createElement("rectangle")
        document.body.appendChild(darken)
        if (this.game.difficulty == 1) {
            //highscore tonen op scherm
            this.highScoresLijst = document.createElement("hoogsteHighscore")
            document.body.append(this.highScoresLijst)
            
            let y = localStorage.getItem("nameHighScoreEasy")
            let y2 = localStorage.getItem("opgeslagenHighScoreEasy")
            this.highScoresLijst.innerHTML = "HIGHSCORE: " + y2 + " by " + y
        }else if (this.game.difficulty == 2){
            //highscore tonen op scherm
            this.highScoresLijst = document.createElement("hoogsteHighscore")
            document.body.append(this.highScoresLijst)

            let y = localStorage.getItem("nameHighScoreMedium")
            let y2 = localStorage.getItem("opgeslagenHighScoreMedium")
            this.highScoresLijst.innerHTML = "HIGHSCORE: " + y2 + " by " + y
        }else if (this.game.difficulty == 3){
            //highscore tonen op scherm
            this.highScoresLijst = document.createElement("hoogsteHighscore")
            document.body.append(this.highScoresLijst)
            
            let y = localStorage.getItem("nameHighScoreHard")
            let y2 = localStorage.getItem("opgeslagenHighScoreHard")
            this.highScoresLijst.innerHTML = "HIGHSCORE: " + y2 + " by " + y
        }
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

    private keyboardInput(event: KeyboardEvent){
        // up down right left
        if (this.eventlistneractive){
            if (event.keyCode == 38) {
                this.letterup()
            }else if (event.keyCode == 40){
                this.letterdown()
            }else if (event.keyCode == 39){
                this.addletter()
            }else if (event.keyCode == 37){
                this.letterback()
            }else if (event.keyCode == 32){
                this.settingname()
            }
        }
    }

    public update(){
        for (const joystick of this.game.Arcade.Joysticks) {
            if (this.eventlistneractive){
                if(joystick.Up && this.timeoutup <= 0){
                    this.letterup()
                    this.timeoutup = 30
                }else if (joystick.Down && this.timeoutdown <= 0){
                    this.letterdown()
                    this.timeoutdown = 30
                }else if (joystick.Right && this.timeoutright <= 0){
                    this.addletter()
                    this.timeoutright = 30
                }else if (joystick.Left && this.timeoutleft <= 0){
                    this.letterback()
                    this.timeoutleft = 30
                }
                this.timeoutup--
                this.timeoutdown--
                this.timeoutleft--
                this.timeoutright--
            }
        }
        let elm = document.getElementById(this.letteractive.toString())
        
        if (elm != undefined) {
            if (this.last != elm && this.last != undefined) {
                console.log("dit is last " + this.last +". dit is elm "+ elm);
                this.last.style.color = "white"
            }
            elm.style.color = "red"
        }
        this.last = elm
        
    }
}