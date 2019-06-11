class Nummers {
nummer : HTMLElement
    constructor(x: number, y: number, scale: number, type: number) {
        this.nummer = document.createElement(`n${type}`)
            document.body.appendChild(this.nummer)
            this.nummer.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
            this.nummer.id = `n${type}`
            console.log("nummercreated");
    }
    delete(){
        this.nummer.style.transform = 'translate(0px, 0px) scale (0)'
    }
}