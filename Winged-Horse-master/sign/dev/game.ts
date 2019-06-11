class Game { 
    constructor() {
        console.log("game created")
// let sign = 
// new Sign ( x coördinaat, y coördinaat,
// de groote[1 is de groote voor allebij{kan ook komma getallen met punt invoegen}], 
// 0 voor de ovale 1 voor het rechthoek )
        let sign = new Sign(100,100, 1, 1)
        let sign2 = new Sign(200, 200, 1, 0)
    }
}

window.addEventListener("load", () => new Game() )