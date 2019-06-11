class Dragon {

  dragon: HTMLElement
  active: boolean
  private x: number
  private y: number
  private scale: number
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
  //moet in de player.ts
  moveChoice(){
    console.log("move choise made");
    
    let random = Math.floor(Math.random() * 10)
    if (random > 5) {
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

  onTame(){
      console.log("Ik ben getamed")
  }

  delete(){
    let elm = document.getElementById("drake");
        document.body.removeChild(elm);
  }

}