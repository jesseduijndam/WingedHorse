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
  constructor(x: number, y: number) {
    this.dragon = document.createElement("dragon")
    document.body.appendChild(this.dragon)
    this.dragon.id = "drake"
    this.dragon.style.transform = `translate(${x}px, ${y}px) scale(0.7)`
    console.log("dragon created");
    this.x = x
    this.y = y 
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
      this.delete()
      this.dragon = document.createElement("dragonattac")
      document.body.appendChild(this.dragon)
      this.dragon.id = "drake"
      let y = this.y - 60
      this.dragon.style.transform = `translate(${this.x}px, ${y}px) scale(1)`
      return "attack" ;
    }
    else{
      console.log("tame");
      this.delete()
      this.dragon = document.createElement("dragontame")
      document.body.appendChild(this.dragon)
      this.dragon.id = "drake"
      let y = this.y + 140
      this.dragon.style.transform = `translate(${this.x}px, ${y}px) scale(0.7)`
      return "tame";
    }
  }
  //geeft door aan hier en verplaatst met functie naar achter nr voor of anders
  onHit(p : Player){
    if (p.AND == 3){
      console.log("AUW!!!!")
      this.delete()
      this.dragon = document.createElement("dragon")
      document.body.appendChild(this.dragon)
      this.dragon.id = "drake"
      this.dragon.style.transform = `translate(${this.x}px, ${this.y}px) scale(0.7)`
    }
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