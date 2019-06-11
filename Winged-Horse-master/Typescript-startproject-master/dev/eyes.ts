class Eyes {
    eyes : HTMLElement
    constructor(x: number, y: number, scale: number) {
        this.eyes = document.createElement("eyes")
    document.body.appendChild(this.eyes)
    this.eyes.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
    }
}