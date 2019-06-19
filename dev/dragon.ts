class Dragon {

  dragon: HTMLElement
  active: boolean
  private diff : number
  private x: number
  private y: number
  //random
  private z: number
  private randommax: number
  private scale: number
  private playscreen: playscreen
  private game : Game
    constructor(x: number, y: number, scale: number) {
    this.dragon = document.createElement("dragon")
    document.body.appendChild(this.dragon)
    this.dragon.id = "drake"
    this.dragon.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
    console.log("dragon created");
    this.x = x
    this.y = y 
    this.scale = scale
  }
  moveChoice(g: Game){
    console.log("move choise made");
    this.game = g
    if (this.game.power == 1) {
      this.diff = 3
    }else{
      this.diff = 5
    }
    this.z = Math.floor(this.game.dragonslayed / 10);
    if (this.z == 0 && this.game.difficulty == 1) {
      this.randommax = 10
    }else if(this.game.difficulty == 2){
      this.randommax = 15
    }else if(this.game.difficulty == 3){
      this.randommax = 20
    }else{
      this.randommax +=5
    }
    console.log(this.randommax);
    
    let random = Math.floor(Math.random() * this.randommax)

    if (random <= this.diff) {
      console.log("attack");
      this.x += 50
      this.dragon.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`
      return "attack" ;
    }
    else{
      console.log("tame");
      this.x -= 50
      this.dragon.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`
      return "tame";
    }
  }
  //geeft door aan hier en verplaatst met functie naar achter nr voor of anders
  onHit(){
      console.log("AUW!!!!")
      this.dragon.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`
  }

  onTame( playscreen : playscreen, g: Game){
    this.playscreen = playscreen
    this.game = g
    this.game.score += 100
    console.log("Ik ben getamed")
  }

  delete(){
    let elm = document.getElementById("drake");
        if (elm != undefined) {
          elm.remove();
        }
  }

}