class Tekst {
 tekst: HTMLElement
    constructor(x : number , y : number, scale : number, type: string) {
        if (type == "naam") {
            this.tekst = document.createElement("naam")
            document.body.appendChild(this.tekst)
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
        }
        if (type == "start"){
            this.tekst = document.createElement("start")
            document.body.appendChild(this.tekst)
            this.tekst.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
            this.tekst.addEventListener("click", () => this.start())
        }
        
    }
    start(){
        console.log("next scene");

        
    }
}