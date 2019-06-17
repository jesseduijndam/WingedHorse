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
    //joystick
    private arcade : Arcade
    private joystickListener: EventListener
    joystick: any;
    button: number;
    // example of game objects
    // private circles : Circle[] = []

    constructor() {

        //startWaardes 
        this.score = 0
        this.health = 0 
        this.power = 0 

        // create arcade cabinet with 2 joysticks (with 6 buttons)
        this.arcade = new Arcade(this)
        
        // The game must wait for de joysticks to connect
        this.joystickListener = (e: Event) => this.initJoystick(e as CustomEvent)
        document.addEventListener("joystickcreated",  this.joystickListener)
        this.currentscreen = new StartScreen(this)
        this.gameLoop()
    }
    
    public gameLoop():void{
        this.currentscreen.update()
        // for (const circle of this.circles) {
        //     circle.update()
        // }

        for(this.joystick of this.arcade.Joysticks){
            this.joystick.update()
            // example: read directions as true / false
            if(this.joystick.Right) console.log('RIGHT')
            if(this.joystick.Up)    console.log('UP')
            if(this.joystick.Down)  console.log('Down')
        }
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

    private buttons(n : number) : void{
        this.button = n
        console.log(n, "button");
        
    }
}

window.addEventListener("load", () => new Game())

