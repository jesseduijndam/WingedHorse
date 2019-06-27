class Dragon {

  dragon: HTMLElement
  active: boolean
  private diff : number
  private x: number
  private y: number
  //random
  private z: number
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
    // console.log("dragon created");
    this.x = x
    this.y = y 
    this.i = 0
  }
  moveChoice(g: Game){
    // console.log("move choise made");
    this.game = g
    if (this.game.power == 1) {
      this.diff = 7
    }else{
      this.diff = 5
    }
    this.z = Math.floor(this.game.dragonslayed / 10);
    if (this.z == 0 && this.game.difficulty == 1) {
      this.game.attackmax = 5
      this.game.randommax = 10
    }else if(this.z==0 && this.game.difficulty == 2){
      this.game.attackmax = 10
      this.game.randommax = 15
    }else if(this.z==0 && this.game.difficulty == 3){
      this.game.attackmax = 15
      this.game.randommax = 20
    }else if(this.z == this.game.previouszplus1){
      this.game.previouszplus1 ++;
      this.game.attackmax +=5   
      this.game.randommax +=5
    }
    // console.log(this.game.randommax, this.game.attackmax , this.game.previouszplus1);
    
    let random = Math.floor(Math.random() * this.game.randommax)

    if (random > this.diff && this.game.attackmax != this.i) {
      this.i++
      //console.log("attack");
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
      // console.log("tame");
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
      // console.log("AUW!!!!")
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
    // console.log("Ik ben getamed")
  }

  delete(){
    let elm = document.getElementById("drake");
        if (elm != undefined) {
          elm.remove();
        }
  }

}