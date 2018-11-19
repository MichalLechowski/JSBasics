// Blackjack

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];

let values = ['Ace', 'King', 'Queen', 'Jack',
    'Ten', 'Nine', 'Eight', 'Seven',
    'Six', 'Five', 'Four', 'Three', 'Two']

let textArea = document.querySelector('#text-area'),
    newGameButton = document.querySelector('#new-game-button'),
    hitButton = document.querySelector('#hit-button'),
    standButton = document.querySelector('#stand-button'),
    divArea = document.querySelector('#img');

let gameStarted = false,
    gameOver = false,
    playerWon = false,
    tie = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

let cardImages = [
    new Image().src = 'cards/2C.png',
    new Image().src = 'cards/2D.png',
    new Image().src = 'cards/2H.png',
    new Image().src = 'cards/2S.png',

    new Image().src = 'cards/3C.png',
    new Image().src = 'cards/3D.png',
    new Image().src = 'cards/3H.png',
    new Image().src = 'cards/3S.png',

    new Image().src = 'cards/4C.png',
    new Image().src = 'cards/4D.png',
    new Image().src = 'cards/4H.png',
    new Image().src = 'cards/4S.png',

    new Image().src = 'cards/5C.png',
    new Image().src = 'cards/5D.png',
    new Image().src = 'cards/5H.png',
    new Image().src = 'cards/5S.png',

    new Image().src = 'cards/6C.png',
    new Image().src = 'cards/6D.png',
    new Image().src = 'cards/6H.png',
    new Image().src = 'cards/6S.png',

    new Image().src = 'cards/7C.png',
    new Image().src = 'cards/7D.png',
    new Image().src = 'cards/7H.png',
    new Image().src = 'cards/7S.png',

    new Image().src = 'cards/8C.png',
    new Image().src = 'cards/8D.png',
    new Image().src = 'cards/8H.png',
    new Image().src = 'cards/8S.png',

    new Image().src = 'cards/9C.png',
    new Image().src = 'cards/9D.png',
    new Image().src = 'cards/9H.png',
    new Image().src = 'cards/9S.png',

    new Image().src = 'cards/10C.png',
    new Image().src = 'cards/10D.png',
    new Image().src = 'cards/10H.png',
    new Image().src = 'cards/10S.png',

    new Image().src = 'cards/AC.png',
    new Image().src = 'cards/AD.png',
    new Image().src = 'cards/AH.png',
    new Image().src = 'cards/AS.png',

    new Image().src = 'cards/JC.png',
    new Image().src = 'cards/JD.png',
    new Image().src = 'cards/JH.png',
    new Image().src = 'cards/JS.png',

    new Image().src = 'cards/KC.png',
    new Image().src = 'cards/KD.png',
    new Image().src = 'cards/KH.png',
    new Image().src = 'cards/KS.png',

    new Image().src = 'cards/QC.png',
    new Image().src = 'cards/QD.png',
    new Image().src = 'cards/QH.png',
    new Image().src = 'cards/QS.png',
];


hitButton.style.display = 'none';
standButton.style.display = 'none';
showStatus();


newGameButton.addEventListener('click', () => {
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    tie = false;

    deck = createDeck();
    shuffleDeck(deck);
    playerCards = [getNextCard(), getNextCard()];
    dealerCards = [getNextCard(), getNextCard()];

    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    standButton.style.display = 'inline';
    showStatus();
})

hitButton.addEventListener('click', () => {
    playerCards.push(getNextCard())
    checkForEndOfGame();
    showStatus();
})

standButton.addEventListener('click', () => {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
})

function checkForEndOfGame() {
    updateScores();

    if (gameOver) {
        while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(getNextCard())
            updateScores();
        }
    }
    if (dealerCards.length === 5) {
        gameOver = true;
        playerWon = false;
    }
    else if (playerScore > 21) {
        gameOver = true;
        playerWon = false;
    }
    else if (dealerScore > 21) {
        gameover = true;
        playerWon = true;
    }
    else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        }
        else if (playerScore === dealerScore) {
            tie = true;
        }
        else {
            playerWon = false;
        }
    }
}

function createDeck() {
    let deck = [];
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
            let card = {
                value: values[valueIndex],
                suit: suits[suitIndex]
            };
            deck.push(card);
        }
    }
    return deck;
}


function getNextCard() {
    return deck.shift();
}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function getScore(cards) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        score += getCardNumericValue(card);
        if (card.value === 'Ace') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function getCardNumericValue(card) {
    switch (card.value) {
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        case 'Ten':
            return 10;

        default:
            return 10;
    }
}

function showStatus() {
    if (!gameStarted) {
        textArea.innerHTML = 'Welcome to Blackjack';
        return;
    }

    let dealerCardString = '';
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += "<pre>" + getCardString(dealerCards[i]) + "</pre>";
    }

    let playerCardString = '';
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += "<pre>" + getCardString(playerCards[i]) + "</pre>";
    }

    updateScores();

    showCardImages(dealerCardString, dealerCards);
    showCardImages(playerCardString, playerCards);
    textArea.innerHTML =
        'Dealer has: ' + '<br>' +
        dealerCardString +
        '(score: ' + dealerScore + ')<br><br>' +

        'Player has: <br>' +
        playerCardString +
        '(score: ' + playerScore + ')<br><br>';

    if (gameOver) {
        if (playerWon) {
            textArea.innerHTML += "YOU WIN";
        }
        else if (!playerWon && tie === false) {
            textArea.innerHTML += "DEALER WINS";
        }
        else if (tie) {
            textArea.innerHTML += "TIE";
        }
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
    }
}

function showCardImages(cardString, cardsArray) {
    let cardsToLower = '';
    // cardsToLower = cardString.toLowerCase();
    let path = '';
    let spr = cardsToLower.indexOf("<pre>") !== -1;
    console.log(spr);

    let tmp = [];
    for (let i = 0; i < cardsArray.length; i++) {
        tmp[i] = cardsArray[i].value + ' of ' + cardsArray[i].suit;
    }

    function checkIfContains(cardsToLower, card) {
        if (cardsToLower.toLowerCase().indexOf(card) !== -1) {
            return true;
        }
        return false;
    }

    for (let i = 0; i < tmp.length; i++) {
        switch (true) {
            case checkIfContains(tmp[i], "two of clubs"):
                path = '<img src="' + cardImages[0] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "two of diamonds"):
                path = '<img src="' + cardImages[1] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "two of hearts"):
                path = '<img src="' + cardImages[2] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "two of spades"):
                path = '<img src="' + cardImages[3] + '"</img>';
                divArea.innerHTML += path;
                break;

            case checkIfContains(tmp[i], "three of clubs"):
                path = '<img src="' + cardImages[4] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "three of diamonds"):
                path = '<img src="' + cardImages[5] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "three of hearts"):
                path = '<img src="' + cardImages[6] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "three of spades"):
                path = '<img src="' + cardImages[7] + '"</img>';
                divArea.innerHTML += path;
                break;

            case checkIfContains(tmp[i], "four of clubs"):
                path = '<img src="' + cardImages[8] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "four of diamonds"):
                path = '<img src="' + cardImages[9] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "four of hearts"):
                path = '<img src="' + cardImages[10] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "four of spades"):
                path = '<img src="' + cardImages[11] + '"</img>';
                divArea.innerHTML += path;
                break;

            case checkIfContains(tmp[i], "five of clubs"):
                path = '<img src="' + cardImages[12] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "five of diamonds"):
                path = '<img src="' + cardImages[13] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "five of hearts"):
                path = '<img src="' + cardImages[14] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "five of spades"):
                path = '<img src="' + cardImages[15] + '"</img>';
                divArea.innerHTML += path;
                break;

            case checkIfContains(tmp[i], "six of clubs"):
                path = '<img src="' + cardImages[16] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "six of diamonds"):
                path = '<img src="' + cardImages[17] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "six of hearts"):
                path = '<img src="' + cardImages[18] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "six of spades"):
                path = '<img src="' + cardImages[19] + '"</img>';
                divArea.innerHTML += path;
                break;

            case checkIfContains(tmp[i], "seven of clubs"):
                path = '<img src="' + cardImages[20] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "seven of diamonds"):
                path = '<img src="' + cardImages[21] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "seven of hearts"):
                path = '<img src="' + cardImages[22] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "seven of spades"):
                path = '<img src="' + cardImages[23] + '"</img>';
                divArea.innerHTML += path;
                break;

            case checkIfContains(tmp[i], "eight of clubs"):
                path = '<img src="' + cardImages[24] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "eight of diamonds"):
                path = '<img src="' + cardImages[25] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "eight of hearts"):
                path = '<img src="' + cardImages[26] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "eight of spades"):
                path = '<img src="' + cardImages[27] + '"</img>';
                divArea.innerHTML += path;
                break;

            case checkIfContains(tmp[i], "nine of clubs"):
                path = '<img src="' + cardImages[28] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "nine of diamonds"):
                path = '<img src="' + cardImages[29] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "nine of hearts"):
                path = '<img src="' + cardImages[30] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "nine of spades"):
                path = '<img src="' + cardImages[31] + '"</img>';
                divArea.innerHTML += path;
                break;

            case checkIfContains(tmp[i], "ten of clubs"):
                path = '<img src="' + cardImages[32] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "ten of diamonds"):
                path = '<img src="' + cardImages[33] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "ten of hearts"):
                path = '<img src="' + cardImages[34] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "ten of spades"):
                path = '<img src="' + cardImages[35] + '"</img>';
                divArea.innerHTML += path;
                break;

            case checkIfContains(tmp[i], "queen of clubs"):
                path = '<img src="' + cardImages[36] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "queen of diamonds"):
                path = '<img src="' + cardImages[37] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "queen of hearts"):
                path = '<img src="' + cardImages[38] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "queen of spades"):
                path = '<img src="' + cardImages[39] + '"</img>';
                divArea.innerHTML += path;
                break;

            case checkIfContains(tmp[i], "king of clubs"):
                path = '<img src="' + cardImages[36] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "king of diamonds"):
                path = '<img src="' + cardImages[37] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "king of hearts"):
                path = '<img src="' + cardImages[38] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "king of spades"):
                path = '<img src="' + cardImages[39] + '"</img>';
                divArea.innerHTML += path;
                break;

            case checkIfContains(tmp[i], "jack of clubs"):
                path = '<img src="' + cardImages[36] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "jack of diamonds"):
                path = '<img src="' + cardImages[37] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "jack of hearts"):
                path = '<img src="' + cardImages[38] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "jack of spades"):
                path = '<img src="' + cardImages[39] + '"</img>';
                divArea.innerHTML += path;
                break;

            case checkIfContains(tmp[i], "ace of clubs"):
                path = '<img src="' + cardImages[36] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "ace of diamonds"):
                path = '<img src="' + cardImages[37] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "ace of hearts"):
                path = '<img src="' + cardImages[38] + '"</img>';
                divArea.innerHTML += path;
                break;
            case checkIfContains(tmp[i], "ace of spades"):
                path = '<img src="' + cardImages[39] + '"</img>';
                divArea.innerHTML += path;
                break;

            default:
                break;
        }
    }

}



function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let rand = Math.random() * deck.length;
        // console.log(rand);
        let swapIndex = Math.trunc(rand);
        // console.log('index: ', swapIndex);

        let tmp = deck[swapIndex];
        deck[swapIndex] = deck[i];
        deck[i] = tmp;
    }
}