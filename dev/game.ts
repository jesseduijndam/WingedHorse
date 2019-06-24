class Game {

    public currentscreen : any
    //score
    public score : number
    private scoreElement:HTMLElement
    public hoogsteHighScoreEasy : number = 0 
    public hoogsteHighScoreMedium : number = 0 
    public hoogsteHighScoreHard : number = 0 
    //Health 
    public health : number
    private healthElement:HTMLElement
    //PowerUp
    public power : number
    private powerElement:HTMLElement
    //difficulty
    public difficulty : number
    public dragonslayed: number = 0
    //joystick
    public arcade : Arcade
    private joystickListener: EventListener
        // joystick: any;
    // example of game objects
        // private circles : Circle[] = []
    //ifactive
    public ifactive : string


    
    public get Arcade() : Arcade {
        return this.arcade
    }
    
    constructor() {

        //startWaardes 
        this.score = 0
        this.health = 0 
        this.power = 0 

        // create arcade cabinet with 2 joysticks (with 6 buttons)
        this.arcade = new Arcade(this)

        
        this.startScreen()
        this.gameLoop()
    }
    
    public gameLoop():void{
        
        // for (const circle of this.circles) {
        //     circle.update()
        // }

        for(let joystick of this.arcade.Joysticks){
            joystick.update()
            // example: read directions as true / false
            if(joystick.Right) console.log('RIGHT')
            if(joystick.Up)    console.log('UP')
            if(joystick.Down)  console.log('Down')
            if(joystick.Left)  console.log('Left')
            
        }
        this.currentscreen.update()
        requestAnimationFrame(() => this.gameLoop())
    }

    public startScreen() {
        document.body.innerHTML = ""
        this.currentscreen = new StartScreen(this)
        this.ifactive = "startscreen"
    }

    public diffscreen(){
        console.log("diff screen trigger");
        document.body.innerHTML = ""
        this.currentscreen = new DiffScreen(this)
        this.ifactive = "diffscreen"
    }

    public shopscreen() {
        document.body.innerHTML = ""
        this.scorenMaken()
        this.healthMaken()
        this.powerMaken() 
        this.currentscreen = new Shop(this)
        this.ifactive = "shopscreen"
    }

    public playscreen() {
        document.body.innerHTML = ""
        this.scorenMaken()
        this.healthMaken()
        this.powerMaken()
        this.currentscreen = new playscreen(this)
        this.ifactive = "playscreen"
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
    private initJoystick(e:CustomEvent) {

        let joystick = this.arcade.Joysticks[e.detail]
        
        // this.circles.push(new Circle(joystick))

        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }
        // alternatively you can handle single buttons
        // Handle button 0 (this is the first button, X-Button on a PS4 controller)
        document.addEventListener(joystick.ButtonEvents[0], () => this.handleJump())
        
    }

    handleJump(){
        console.log("hello");
        
    }

    public disconnect() {
        document.removeEventListener("joystickcreated", this.joystickListener)
        // for (const circle of this.circles) {
        //     circle.remove()
        // }
        // this.circles = []
    }//
}

window.addEventListener("load", () => new Game())

