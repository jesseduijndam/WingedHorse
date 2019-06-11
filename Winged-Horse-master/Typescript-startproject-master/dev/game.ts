class Game {

    public currentscreen : any
    //score
    public score : number
    private scoreElement:HTMLElement
    //Health 
    public health : number
    private healthElement:HTMLElement
    //PowerUp
    
    public power : number
    private powerElement:HTMLElement
    
    constructor() {

        //startWaardes 
        this.score = 0
        this.health = 0 
        this.power = 0 

        this.currentscreen = new StartScreen(this)
        this.gameLoop()
    }
    
    public gameLoop():void{
        this.currentscreen.update()
        requestAnimationFrame(() => this.gameLoop())
    }

    public startScreen() {
        document.body.innerHTML = ""
        this.scorenMaken()
        this.currentscreen = new StartScreen(this)
    }

    public shopscreen() {
        document.body.innerHTML = ""
        this.scorenMaken()
        this.healthMaken()
        this.powerMaken() 
        this.currentscreen = new Shop(this)
    }

    public playscreen() {
        document.body.innerHTML = ""
        this.scorenMaken()
        this.healthMaken()
        this.powerMaken()
        this.currentscreen = new playscreen(this)
    }

    public scorenMaken(){
        this.scoreElement = document.createElement("scoreElement")
        document.body.appendChild(this.scoreElement) 
        this.scoreElement.innerHTML = "SCORE: " + this.score;
        console.log("scoreLEement:" + this.score)
    }

    public healthMaken(){
        this.healthElement = document.createElement("healthElement")
        document.body.appendChild(this.healthElement) 

        if (this.health == 1) {
            this.healthElement.innerHTML = " + health "  
        } else {
            console.log("nog geen health")
        } 
    }

    public powerMaken(){
        this.powerElement = document.createElement("powerElement")
        document.body.appendChild(this.powerElement) 

        if (this.power == 1) {
            this.powerElement.innerHTML = " + power "  
        } else {
            console.log("nog geen power")
        } 
    }

}

window.addEventListener("load", () => new Game())

