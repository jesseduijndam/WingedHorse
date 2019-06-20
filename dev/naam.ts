class Tekst {
 tekst: HTMLElement
 private game : Game
    constructor(x : number , y : number, scale : number, type: string, g: Game) {
        this.game = g
        if (type == "naam") {
            this.tekst = document.createElement("naam")
            document.body.appendChild(this.tekst)
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
        }else if (type == "start"){
            this.tekst = document.createElement("start")
            document.body.appendChild(this.tekst)
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
            this.tekst.addEventListener("click", () => this.start());
        }else{
            this.tekst = document.createElement("tekst")
            document.body.appendChild(this.tekst)
            this.tekst.innerHTML = type
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
            this.tekst.addEventListener("click", () => this.easy());
        }
        
    }
    start(){
        this.game.diffscreen()
        console.log("next scene");  
    }

    easy(){
        this.game.difficulty = 1
        this.game.playscreen()
        console.log("next scene");  
    }

    medium(){
        this.game.difficulty = 2
        this.game.playscreen()
        console.log("next scene");  
    }

    hard(){
        this.game.difficulty = 3
        this.game.playscreen()
        console.log("next scene");  
    }
}