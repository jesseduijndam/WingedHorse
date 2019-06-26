class Dragon {

  dragon: HTMLElement
  active: boolean
  private diff : number
  private x: number
  private y: number
  //random
  private z: number
  private randommax: number
  private attackmax: number
  private previouszplus1 : number
  private i : number
  private game : Game
  private randomcolor : number
  constructor(x: number, y: number) {
    this.dragon = document.createElement("dragon")
    document.body.appendChild(this.dragon)
    this.dragon.id = "drake"
    this.dragon.style.transform = `translate(${x}px, ${y}px) scale(0.7)`
    this.randomcolor = Math.random() * 360;
    this.dragon.style.filter = "hue-rotate("+ this.randomcolor +"deg)"
    console.log("dragon created");
    this.x = x
    this.y = y 
    this.previouszplus1 = 1
    this.i = 0
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
      this.attackmax = 5
      this.randommax = 10
    }else if(this.z==0 && this.game.difficulty == 2){
      this.attackmax = 10
      this.randommax = 15
    }else if(this.z==0 && this.game.difficulty == 3){
      this.attackmax = 15
      this.randommax = 20
    }else if(this.z == this.previouszplus1){
      this.previouszplus1 = this.z + 1
      this.attackmax +=5
      this.randommax +=5
    }
    console.log(this.randommax);
    
    let random = Math.floor(Math.random() * this.randommax)

    if (random <= this.diff && this.attackmax != this.i) {
      this.i++
      console.log("attack");
      this.delete()
      this.dragon = document.createElement("dragonattac")
      document.body.appendChild(this.dragon)
      this.dragon.id = "drake"
      let y = this.y - 60
      this.dragon.style.transform = `translate(${this.x}px, ${y}px) scale(1)`
      this.dragon.style.filter = "hue-rotate("+ this.randomcolor +"deg)"
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
      this.dragon.style.filter = "hue-rotate("+ this.randomcolor +"deg)"
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
      this.dragon.style.filter = "hue-rotate("+ this.randomcolor +"deg)"
    }
  }

  onTame(g: Game){
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