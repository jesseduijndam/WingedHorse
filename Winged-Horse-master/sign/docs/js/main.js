class Game {
    constructor() {
        console.log("game created");
        // let sign = 
        // new Sign ( x coördinaat, y coördinaat,
        // de groote[1 is de groote voor allebij{kan ook komma getallen met punt invoegen}], 
        // 0 voor de ovale 1 voor het rechthoek )
        let sign = new Sign(100, 100, 1, 1);
        let sign2 = new Sign(200, 200, 1, 0);
    }
}
window.addEventListener("load", () => new Game());
//hier hoef je niks aan te veranderen so get out
class Sign {
    constructor(x, y, scale, type) {
        if (type == 0) {
            this.sign = document.createElement("sign");
            document.body.appendChild(this.sign);
            this.sign.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            console.log("signcreated");
        }
        else {
            this.bord = document.createElement("bord");
            document.body.appendChild(this.bord);
            this.bord.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            console.log("bordcreated");
        }
    }
}
//# sourceMappingURL=main.js.map