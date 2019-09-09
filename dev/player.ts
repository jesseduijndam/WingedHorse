class Player {

  player: HTMLElement
  
  buttons = new Array<number>(2)
  check : boolean = false
  AND : number
  public die : boolean = false
  public canrun : boolean = true
  public currentscreen: any
  balls: boolean = false
  private playscreen : playscreen
  private game : Game
  private x : number
  private y : number
  private scale : number
  //timer
  private timer : number

  constructor(x: number, y: number, scale: number , playscreen : playscreen , g : Game) {
    this.timer = 0
    this.playscreen = playscreen
    this.game = g
    this.player = document.createElement("player")
    document.body.appendChild(this.player)
    this.player.id = "player"
    this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
    // console.log("player created");
    document.addEventListener('keydown', (e) => this.keyboardInput(e, x, y, scale))
  }
  update(){
    if (this.game.difficulty == 2) {
      this.timer++
      if (this.timer == 600) {
        this.playscreen.die()
      }
    }else if (this.game.difficulty == 3) {
      this.timer++
      if (this.timer == 300) {
        this.playscreen.die()
      }
    }
  }
  
  keyboardInput(event: KeyboardEvent, x: number, y: number, scale: number) {
    // PRESS LEFT ARROW
    this.x = x
    this.y = y
    this.scale = scale
    if (event.keyCode == 37) {
      this.timer = 0
      x -= 10
      this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
      this.playscreen.run()
    }
    // PRESS UP ARROW attack
    else if (event.keyCode == 38) {
      this.timer = 0
        if (this.game.action == "attack" && this.die == false && this.check == true) {
          this.check = false
          let one = this.buttons[0]
          let two = this.buttons[1]
          let three = this.buttons[2]
          let nummer1 = new Nummers(300,-100,0.2,one)
          let nummer2 = new Nummers(402.4,-100,0.2,two)
          let nummer3 = new Nummers(504.8,-100,0.2,three)
          this.balls = true
          // console.log(this.buttons);
            //WORD EEN ANIMATIE OF ANDER PLAATJE NU NOG NIET
            y -= 10
            this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
          this.AND = 0
        }else{
          // draak vermoord je wilde getemd worden kan mooier maar voor nu nr de die scene
          if (this.game.action != "test" && this.die == false) {
            this.playscreen.die()
            this.game.action = "test"
          }
          
        }
      
      
    }
    // PRESS RIGHT ARROW start its move
    else if (event.keyCode == 39) {
      this.timer = 0
      if (this.canrun == true){
        if (this.check == false) {
          x += 10
          this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
          this.check = true
          // console.log("move choise making")
          this.game.action = this.playscreen.dragon.moveChoice(this.game)
        }else{
          this.playscreen.die()
          this.game.action = "test"
        }
        if (this.game.action == "attack") {
          let number = 0
          let arr: number[] = [1, 2, 3, 4, 5, 6]
          let buttons = new Array<number>(2)
          while (buttons.length == 2) {
            let multi = arr.length
            let random = Math.floor(Math.random() * multi)
            
            buttons[number] = arr[random]
              arr.splice(random,1)
            number++
  
          }
          this.buttons = buttons
          
        }
      }  
    }
    // PRESS DOWN ARROW tame
    else if (event.keyCode == 40) {
      this.timer = 0
      if (this.game.action == "tame" && this.die == false && this.check == true) {
          this.playscreen.dragon.onTame(this.game)
          this.canrun = false
          this.game.action = "test"
          this.check = false
          this.playscreen.naarDeShop()
          //WORD EEN ANIMATIE OF ANDER PLAATJE NU NOG NIET
          y += 10
          this.player.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
      }else{
        // draak vermoord je wilde getemd worden kan mooier maar voor nu nr de die scene
        if (this.die == false) {
          this.playscreen.die()

          this.nummerdelete()
          this.game.action = "test"
        }
      }
    }
    //Q
    else if (event.keyCode == 81) {
      if (this.buttons[0] == 1 || this.buttons[1] == 1 || this.buttons[2] == 1 ) {
          this.FAND()
      } else{
        this.playscreen.die()
      }
      
    }
    //W
    else if (event.keyCode == 87) {
      if (this.buttons[0] == 2 || this.buttons[1] == 2 || this.buttons[2] == 2 ) {
        this.FAND()
      } else{
        this.playscreen.die()
      }
    }
    //E
    else if (event.keyCode == 69) {
      if (this.buttons[0] == 3 || this.buttons[1] == 3 || this.buttons[2] == 3 ) {
        this.FAND()
      } else{
        this.playscreen.die()
      }  
    }
    //A
    else if (event.keyCode == 65) {
      if (this.buttons[0] == 4 || this.buttons[1] == 4 || this.buttons[2] == 4 ) {
        this.FAND()
      } else{
        this.playscreen.die()
      }
      
    }
    //S
    else if (event.keyCode == 83) {
      if (this.buttons[0] == 5 || this.buttons[1] == 5 || this.buttons[2] == 5 ) {
        this.FAND()
      } else{
        this.playscreen.die()
      }
      
    }
    //D
    else if (event.keyCode == 68) {
      if (this.buttons[0] == 6 || this.buttons[1] == 6 || this.buttons[2] == 6 ) {
        this.FAND()
      } else{
        this.playscreen.die()
      }
      
    }
    /* 
    //PRESS SPACE BAR
    else if (event.keyCode == 32) {
      window.alert("Space Key Pressed");
    }
    */
   
  }

  numbers(n: number){
      // console.log(`button ${n} pushed`);
      if (this.buttons[0] == n || this.buttons[1] == n || this.buttons[2] == n ) {
        this.FAND()
      } else{
      this.playscreen.die()
      }
  }
  
  up(){
    // console.log(this.game.action);
    // console.log(this.die);
    // console.log(this.check);
    this.timer = 0
    if (this.game.action == "attack" && this.die == false && this.check == true) {
      this.check = false
      let one = this.buttons[0]
      let two = this.buttons[1]
      let three = this.buttons[2]
      let nummer1 = new Nummers(300,-100,0.2,one)
      let nummer2 = new Nummers(402.4,-100,0.2,two)
      let nummer3 = new Nummers(504.8,-100,0.2,three)
      this.balls = true
      // console.log(this.buttons);
        //WORD EEN ANIMATIE OF ANDER PLAATJE NU NOG NIET
        this.y -= 10
        this.player.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`
      this.AND = 0
    }else{
      // draak vermoord je wilde getemd worden kan mooier maar voor nu nr de die scene
      if ( this.die == false) {
        this.playscreen.die()
        this.game.action = "test"
      }
      
    }
  }
  
  down(){
    this.timer = 0
    if (this.game.action == "tame" && this.die == false && this.check == true) {
      this.playscreen.dragon.onTame(this.game)
      this.canrun = false
      this.game.action = "test"
      this.check = false
      this.playscreen.naarDeShop()
      //WORD EEN ANIMATIE OF ANDER PLAATJE NU NOG NIET
      this.y += 10
      this.player.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`
    }else{
    // draak vermoord je wilde getemd worden kan mooier maar voor nu nr de die scene
      if (this.die == false) {
        this.playscreen.die()
        this.game.action = "test"
      }
    }
  }
  
  right(){    
    this.timer = 0
    if(this.canrun == true){
      if (this.check == false) {
        this.x += 10
        this.player.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`
        this.check = true
        // console.log("move choise making")
        this.game.action = this.playscreen.dragon.moveChoice(this.game)
      }else{
        this.playscreen.die()
        this.game.action = "test"
      }
      if (this.game.action == "attack") {
        let number = 0
        let arr: number[] = [1, 2, 3, 4, 5, 6]
        let buttons = new Array<number>(2)
        while (buttons.length == 2) {
          let multi = arr.length
          let random = Math.floor(Math.random() * multi)
          
          buttons[number] = arr[random]
            arr.splice(random,1)
          number++

        }
        this.buttons = buttons
      }
    }
  }
  left(){
    this.timer = 0
    this.x -= 10
    this.player.style.transform = `translate(${this.x}px, ${this.y}px) scale(${this.scale})`
    this.playscreen.run()
  }

  FAND(){
    this.AND++
    if (this.AND == 3 ) {
      this.timer = 0
      this.playscreen.dragon.onHit(this)
      this.nummerdelete()
    }
  }

  nummerdelete(){
    for (let i = 0; i < 3; i++) {
      if (this.balls == true) {
        let elm = document.getElementById(`n${this.buttons[i]}`);
        if (elm != undefined) {
          elm.remove();
        }
        
      }
    }
    this.balls = false
  }

  delete(){
    let elm = document.getElementById("player");
      if (elm != undefined) {
        elm.remove();
      }
        this.die = true
  }
}
