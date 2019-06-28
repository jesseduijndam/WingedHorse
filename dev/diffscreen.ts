class DiffScreen {

    private game : Game
    private callBackEasy : EventListener
    private callBackMedium : EventListener
    private callBackHard : EventListener
   
    constructor( g: Game ) {
        this.game = g
        // console.log("diffscreenload");

        this.callBackEasy =  () => this.difficulty(1)
        this.callBackMedium = () => this.difficulty(2)
        this.callBackHard = () => this.difficulty(3)
        
        let background = document.createElement("startbackground")
        document.body.appendChild(background)
       
        let start = new Tekst(530, 290, 3, "easy", g)
        let start1 = new Tekst(500, 390, 3, "medium", g)
        let start2 = new Tekst(530, 490, 3, "hard", g)
        if (this.game.onarcade == true) {
          let bttn = new Tekst(250, 300, 0.5, "[1]", g)
          let bttn2 = new Tekst(250, 400, 0.5, "[2]", g)
          let bttn3 = new Tekst(250, 500, 0.5, "[3]", g)  
        }
        
        document.addEventListener("joystick0button0", this.callBackEasy)
        document.addEventListener("joystick0button1", this.callBackMedium)
        document.addEventListener("joystick0button2", this.callBackHard)
    }

    private difficulty(n: number){
        this.game.difficulty = n
        document.removeEventListener("joystick0button0", this.callBackEasy)
        document.removeEventListener("joystick0button1", this.callBackMedium)
        document.removeEventListener("joystick0button2", this.callBackHard)
        if (this.game.onarcade == true && n == 1) {
          this.game.instructionscreen()
        }else{
          this.game.playscreen()  
        }        
        // console.log("selected difficulty " + n)
        // console.log("next scene"); 
        
    }

    public update() {
        
    }

}