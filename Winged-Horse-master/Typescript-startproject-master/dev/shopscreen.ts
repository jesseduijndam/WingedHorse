class Shop {

    private achtergrond: HTMLElement 
    private health: HTMLElement
    private powerUp: HTMLElement 
    private nextGame: HTMLElement 
    private message: HTMLElement 
    private game : Game
    private waardeHealth : number
    private waardePower : number 
    
    constructor( g: Game ) {
    
        this.game = g 
        //Prijzen van de scores
        this.waardeHealth = 300
        this.waardePower = 200

        //ACHTERGROND
        this.achtergrond = document.createElement("achtergrondShop")
        document.body.appendChild(this.achtergrond)

        //HEALTH
        this.health = document.createElement("health")   
        this.health.innerHTML = "HEALTH (300)"     
        document.body.appendChild(this.health);
        this.health.addEventListener("click", () => this.kooptHealth());

        //POWER
        this.powerUp = document.createElement("powerUp")
        this.powerUp.innerHTML = "POWER UP (200) "     
        document.body.appendChild(this.powerUp);
        this.powerUp.addEventListener("click", () => this.kooptPowerUp());

        //NEXTGAME
        this.nextGame = document.createElement("nextGame")
        document.body.appendChild(this.nextGame)
        this.nextGame.addEventListener("click", () => this.naarStart());

        //MESSAGE
        this.message = document.createElement("message")
          
        document.body.appendChild(this.message)

    }
    
    public naarStart(){
        console.log("start button werkt")
        this.game.playscreen()  
    }

    public kooptHealth(){ 
        if( this.game.health == 0 ){

            if ( this.game.score - this.waardeHealth > 0 ) { 
                this.game.health = this.game.health + 1  
                this.game.score = this.game.score - this.waardeHealth
                this.updateScore(this.game.score)
                let healthElement = document.getElementsByTagName("healthElement")[0];
                healthElement.innerHTML = "+ Health"
            } 
            else {
                this.message.innerHTML = "Je hebt te weinig geld"  
            }

        }else{
            this.message.innerHTML = "Je hebt al health"   
        }
    }

    public kooptPowerUp(){ 
        if( this.game.power == 0 ){

            if (this.game.score - this.waardePower > 0) { 
                this.game.power = this.game.power + 1  
                this.game.score = this.game.score - this.waardePower
                this.updateScore(this.game.score)
                let powerElement = document.getElementsByTagName("powerElement")[0]
                powerElement.innerHTML = "+ Power"  
            } 
            else {
                this.message.innerHTML = "Je hebt te weinig geld"   
            }

        }else{
            this.message.innerHTML = "Je hebt al health"
           
        }
    }

    public updateScore(nieuweScore: number){
        //veranderd de score
        let scoreElement = document.getElementsByTagName("scoreElement")[0];
        scoreElement.innerHTML = "SCORE: " + nieuweScore;
    }

}