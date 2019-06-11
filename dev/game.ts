class Game { 

    player : Player
    dragon : Dragon

    constructor() {
        console.log("game created")
          //this.startscene()  
          this.playscreen()
    }
    startscene(){
        let background = document.createElement("startbackground")
        document.body.appendChild(background)
        let sign = new Sign(260, 150, 1, 0)
        let name = new Tekst(430, 250, 1, "naam")
        let sign2 = new Sign(365,600, 0.5,1)
        let start = new Tekst(625, 670, 1, "start")
    }

    playscreen(){
        let background = document.createElement("backdrak")
        document.body.appendChild(background)
        this.dragon = new Dragon(900 , 430, 2)
        this.player = new Player(150 , 400, 2, this)
    }

    run(){
       if (this.player.canrun == true) {
         console.log("run");  
       }       
    }

    die(){
        if (this.player.die == false) {
            this.player.canrun = false
            console.log("ik ben dood");
            this.dragon.delete()
            this.player.delete()
            let eyes = new Eyes(450, 150, 1)
        }
        
        
    }
}

window.addEventListener("load", () => new Game() )