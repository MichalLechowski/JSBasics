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

let btnPlay
let btnStart
let btnStop
let startTime

let soundsRecorder = [];

const sounds = [
    {
        id: 97,
        name: 'boom'
    },
    {
        id: 115,
        name: 'clap'
    },
    {
        id: 100,
        name: 'hihat'
    },
    {
        id: 102,
        name: 'kick'
    },
    {
        id: 103,
        name: 'openhat'
    },
    {
        id: 104,
        name: 'ride'
    },
    {
        id: 106,
        name: 'snare'
    },
    {
        id: 107,
        name: 'tink'
    },
    {
        id: 108,
        name: 'tom'
    }
]

function app() {
    document.body.addEventListener('keypress', playSound);

    btnPlay = document.querySelector('#btnPlay');
    btnStart = document.querySelector('#btnStart');
    btnStop = document.querySelector('#btnStop');

    btnStart.addEventListener('click', () => {
        startTime = Date.now();
        recording = true;
        document.querySelector(`#recordState`).style.background = 'red';
        soundsRecorder = [];
    })

    btnStop.addEventListener('click', () => {
        recording = false;
        document.querySelector(`#recordState`).style.background = '';
    })

    btnPlay.addEventListener('click', () => {
        soundsRecorder.forEach( sound => {
            setTimeout(() => {
                let soundElement = document.querySelector(`#${sound.name}`);
                soundElement.currentTime = 0;
                soundElement.play();
            }, sound.time);
        })
    })

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

function highlightBox(className) {
    document.querySelector(`.${className}`).classList.add('highlight');
    setTimeout(() => {
        document.querySelector(`.${className}`).classList.remove('highlight');
    }, 200);
}

function playSound(e) {
    //znajdź dźwięk
    let sound = sounds.find(el => el.id == e.keyCode);
    let soundElement = document.querySelector(`#${sound.name}`);
    //odtwarzaj player
    soundElement.currentTime = 0;
    soundElement.play();
    //podświetl klawisz
    highlightBox(sound.name);
    //zapisz na ścieżce
    soundsRecorder.push({
        name: sound.name,
        time: Date.now() - startTime
    })
    console.log(e.keyCode);
}

    // switch (e.keyCode) {
    //     case 97:
    //         boom.currentTime = 0;
    //         boom.play()
    //         let soundType = 'boom';
    //         highlightBox(soundType);
    //         soundsRecorder.push(new Sound(soundType));
    //         break;

    //     case 115:
    //         clap.currentTime = 0;
    //         clap.play()
    //         highlightBox('clap');
    //         break;

    //     case 100:
    //         hihat.currentTime = 0;
    //         hihat.play()
    //         highlightBox('hihat');
    //         break;

    //     case 102:
    //         kick.currentTime = 0;
    //         kick.play()
    //         highlightBox('kick');
    //         break;

    //     case 103:
    //         openhat.currentTime = 0;
    //         openhat.play()
    //         highlightBox('openhat');
    //         break;

    //     case 104:
    //         ride.currentTime = 0;
    //         ride.play()
    //         highlightBox('ride');
    //         break;

    //     case 106:
    //         snare.currentTime = 0;
    //         snare.play()
    //         highlightBox('snare');
    //         break;

    //     case 107:
    //         tink.currentTime = 0;
    //         tink.play()
    //         highlightBox('tink');
    //         break;

    //     case 108:
    //         tom.currentTime = 0;
    //         tom.play()
    //         highlightBox('tom');
    //         break;

    //     default:
    //         break;
    // }
