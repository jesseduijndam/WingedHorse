class Sign{
    sign : HTMLElement
    bord : HTMLElement
    constructor(x : number , y : number, scale : number, type : number){
        if (type == 0) {
            this.sign = document.createElement("sign")
            document.body.appendChild(this.sign)
            this.sign.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
            console.log("signcreated");
        } else if(type == 1){
            this.bord = document.createElement("bord")
            document.body.appendChild(this.bord)
            this.bord.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
            console.log("bordcreated");
        } else if(type == 2){
            this.bord = document.createElement("bord2")
            document.body.appendChild(this.bord)
            this.bord.id = "bord"
            this.bord.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
            console.log("back2shop created");
        }             
    }
    delete(){
    let elm = document.getElementById("bord");
      if (elm != undefined) {
        elm.remove();
      }
    }
}