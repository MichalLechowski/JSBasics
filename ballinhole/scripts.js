window.addEventListener('deviceorientation', phoneMove)
document.addEventListener('DOMContentLoaded', appStart)

let ballDom, holeDom, alert;

const ball = {
    x: 0,
    y: 0,
    xSpeed: 0,
    yspeed: 0,
    maxXSpeed: 4,
    maxYSpeed: 4
};

const startOrientation = {
    alpha: 0,
    beta: 0,
    gamma: 0,
    isSet: false
};

const hole = {
    x: 0,
    y: 0
};

function appStart() {
    ballDom = document.querySelector('#ball');
    holeDom = document.querySelector('#hole');
    alert = document.querySelector('#alert');
    //wylosować i ustalić położenie
    hole.x = parseInt((Math.random() * window.innerHeight).toFixed());
    hole.y = parseInt((Math.random() * window.innerWidth).toFixed());
    holeDom.style.top = hole.y + 'px';
    holeDom.style.left = hole.x + 'px';
    moveBall();
}

function setOrientation(alpha, beta, gamma) {
    startOrientation.alpha = alpha;
    startOrientation.beta = beta;
    startOrientation.gamma = gamma;
    startOrientation.isSet = true;
}

function phoneMove(e) {
    if (!startOrientation.isSet) {
        setOrientation(e.alpha, e.gamma, e.gamma);
    }

    const alphaRotation = e.alpha - startOrientation.alpha;
    const betaRotation = e.beta - startOrientation.beta;
    const gammaRotation = e.gamma - startOrientation.gamma;

    console.log(e.alpha, e.beta, e.gamma);
    ball.xSpeed = (alphaRotation / 360) * ball.maxXSpeed;
    ball.yspeed = ((betaRotation) / 180) * ball.maxYSpeed;

}

function moveBall() {

    if (ball.x <= window.innerWidth) {
        ball.x += ball.xSpeed;
    }
    else {
        ball.x = window.innerWidth;
    }

    if (ball.y <= window.innerWidth) {
        ball.y += ball.xSpeed;
    }
    else {
        ball.x = 0;
    }

    if (Math.abs(ball.x - hole.x) < 5 && Math.abs(ball.y - hole.y) < 5){
        alert.style.visibility = "visible";
    }

    ball.x += ball.xSpeed;
    ball.y += ball.yspeed;
    ballDom.style.left = ball.x + 'px';
    ballDom.style.top = ball.y + 'px';

    requestAnimationFrame(moveBall);
}

