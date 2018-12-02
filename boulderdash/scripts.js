document.addEventListener('DOMContentLoaded', appStart);

async function appStart() {
    await createGround();
    await createRocks();
    await createDiamonds();
}

async function createGround() {
    let gameWindow = document.querySelector('#gameWindow');
    let horizontalRatio = (gameWindow.clientWidth / 30) * (gameWindow.clientHeight / 30);
    console.log('actual width: ' + gameWindow.clientWidth);
    console.log('horizontal: ' + horizontalRatio);

    for (let i = 0; i <= horizontalRatio; i++) {

        // można przeliczyć ile będzie kwadratów na 1200/600 (20*40 = 800) i iterować forami i wstawiać odpowiednie obiekty
        if ((i >= 240 && i <= 270) || (i >= 528 && i <= 559)) {
            let element = document.createElement('div');
            element.id = `${i}`;
            element.style.backgroundImage = "url('image/solid.png')";
            element.classList.add('square30px');
            element.classList.add('wall');
            gameWindow.appendChild(element);
        }
        else if (i == 82) {
            let element = document.createElement('div');
            element.id = `${i}`;
            element.style.backgroundImage = "url('image/door.png')";
            element.classList.add('square30px');
            element.classList.add('start');
            gameWindow.appendChild(element);
        }
        else {
            let element = document.createElement('div');
            element.id = `${i}`;
            element.style.backgroundImage = "url('image/dirt.png')";
            element.classList.add('square30px');
            element.classList.add('walkable');
            gameWindow.appendChild(element);
        }
    }
}



async function createDiamonds() {

    let gameWindow = document.querySelector('#gameWindow');
    let ratio = (gameWindow.clientWidth / 30) * (gameWindow.clientHeight / 30);

    for (let i = 0; i <= 30; i++) {
        let randomDivId = Math.floor(Math.random() * ratio);
        let element = document.getElementById(`${randomDivId}`);
        if (element.classList.contains("walkable") || element.classList.contains("start")) {
        element.style.backgroundImage = "url('image/diamond.png')";
        element.classList.add('square30px');
        element.classList.add('gatherable');
        }
        else{
            i--;
        }
    }
}


async function createRocks() {

    let gameWindow = document.querySelector('#gameWindow');
    let ratio = (gameWindow.clientWidth / 30) * (gameWindow.clientHeight / 30);

    for (let i = 0; i <= 60; i++) {
        let randomDivId = Math.floor(Math.random() * ratio);
        let element = document.getElementById(`${randomDivId}`);
        if (element.classList.contains("walkable") || element.classList.contains("start")) {
            element.style.backgroundImage = "url('image/rock1.png')";
            element.classList.add('square30px');
            element.classList.add('moveable');
        }
        else {
            i--;
        }
    }
}