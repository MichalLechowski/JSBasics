document.addEventListener('DOMContentLoaded', app);


let boom
let clap
let hihat
let kick
let openhat
let ride
let snare
let tink
let tom

function app() {
    document.body.addEventListener('keypress', playSound);

    boom = document.querySelector('#boom')
    clap = document.querySelector('#clap')
    hihat = document.querySelector('#hihat')
    kick = document.querySelector('#kick')
    openhat = document.querySelector('#openhat')
    ride = document.querySelector('#ride')
    snare = document.querySelector('#snare')
    tink = document.querySelector('#tink')
    tom = document.querySelector('#tom')
}

function playSound(e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 97:
            boom.currentTime = 0;
            boom.play()
            break;

        case 115:
            clap.currentTime = 0;
            clap.play()
            break;

        case 100:
            hihat.currentTime = 0;

            hihat.play()
            break;

        case 102:
            kick.currentTime = 0;

            kick.play()
            break;

        case 103:
            openhat.currentTime = 0;

            openhat.play()
            break;

        case 104:
            ride.currentTime = 0;

            ride.play()
            break;

        case 105:
            snare.currentTime = 0;

            snare.play()
            break;

        case 106:
            tink.currentTime = 0;

            tink.play()
            break;

        case 107:
            tom.currentTime = 0;

            tom.play()
            break;

        default:
            break;
    }
}