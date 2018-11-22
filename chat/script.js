document.addEventListener('DOMContentLoaded', appStart);
const wsURL = 'ws://91.121.6.192:8010/'
const ws = new WebSocket(wsURL);
const clientId = Math.floor(Math.random() * 10000);

let author, messages, newMsg, sendBtn;

function appStart() {
    messages = document.querySelector('#messages');
    sendBtn = document.querySelector('#send');
    newMsg = document.querySelector('#msg');
    author = document.querySelector('#author');


    // 1. utworz polaczenie
    // ws = new WebSocket(wsURL);
    // 2. dodaj obsluge wyslania wiadomosci
    sendBtn.addEventListener('click', sendMessage);
    // 3. utworz funkcje wyswietlenia
    // 4. dodaj obsluge odbioru wiadomosci
    ws.addEventListener('message', onMessage);

}

function onMessage(e) {
    let msg = JSON.parse(e.data);
    if (msg.id !== clientId) {
        appendMessage(msg);
    }
}


/**
 * 
 * @param {string} msg wiadomosc dla uzytkownika 
 */
function appendMessage(msg) {
    let d = new Date(msg.date);
    let newMsg = document.createElement('div');
    newMsg.classList.add('msg');
    newMsg.innerHTML =
        `<div class='author'>${msg.author}</div>
         <div class='msgText'>${msg.msg}</div>
         <div class='msgDate'>${d.toLocaleTimeString()}</div>`

    messages.appendChild(newMsg);
}

//wysyla wiaodmosc przez websocket
function sendMessage() {
    let d = new Date();
    let msg = {
        id: clientId,
        author: author.value,
        msg: newMsg.value,
        date: d.toISOString()
    };
    ws.send(JSON.stringify(msg));
    showConfirmation();
}

function showConfirmation() {
    let confirmDiv = document.querySelector('#confirm');
    confirmDiv.classList.remove('hidden');
    setTimeout(() => {
        confirmDiv.classList.add('hidden');
    },
        3000)
}