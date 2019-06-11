//hier hoef je niks aan te veranderen so get out
class Sign{
    sign : HTMLElement
    bord : HTMLElement
    constructor(x : number , y : number, scale : number, type : number){
        if (type == 0) {
            this.sign = document.createElement("sign")
            document.body.appendChild(this.sign)
            this.sign.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
            console.log("signcreated");
        } else{
            this.bord = document.createElement("bord")
            document.body.appendChild(this.bord)
            this.bord.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
            console.log("bordcreated");
        }                   
    }
}