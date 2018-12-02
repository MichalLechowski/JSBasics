const flakesCount = 200;
const maxXSpeed = 3;
const maxYSpeed = 6;
const minSize = 3;
const maxSize = 20;
const degreeStep = 0.02;
const minYSpeed = 0.4;

let flakes = [];
let degree = 0;

document.addEventListener("DOMContentLoaded", appStart);

function Flake() {
    this.xPos = Math.random() * window.innerWidth;
    this.yPos = Math.random() * (-100);
    this.size = minSize + Math.random() * maxSize;
    this.xSpeed = Math.random() * maxXSpeed * this.size/maxSize;
    this.ySpeed = Math.random() * (maxYSpeed + minYSpeed) * this.size/maxSize;
    this.degree = Math.floor(Math.random() * 100);
    this.DOMElement = document.createElement('div');
    this.DOMElement.classList.add('flake');
    this.DOMElement.style.width = `${this.size}px`;
    this.DOMElement.style.height = `${this.size}px`;
    this.DOMElement.style.left = `${this.xPos}px`;
    this.DOMElement.style.top = `${this.yPos}px`;

    this.resetYPos = () => {
        this.yPos = Math.random() * maxYSpeed;
    }

    this.updatePosition = () => {
        this.degree += degreeStep;
        this.xPos += Math.sin(this.degree) * this.xSpeed;
        this.yPos += this.ySpeed;

        if (this.yPos > window.innerHeight) {
            this.resetYPos();
        }
        this.DOMElement.style.left = `${this.xPos}px`;
        this.DOMElement.style.top = `${this.yPos}px`;
    }
}


function appStart() {

    // wygeneruj flakesCount sniezek
    // animuj sniezki  
    let sky = document.querySelector('#sky');
    for (let i = 0; i < flakesCount; i++) {
        let flake = new Flake();
        flakes.push(flake);
        sky.appendChild(flake.DOMElement);
    }
    animate();



}

function animate() {

    flakes.forEach(flake => {
       flake.updatePosition();
    })
    // odśwież animacje
    requestAnimationFrame(animate);
}

