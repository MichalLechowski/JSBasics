// Blackjack

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];

let values = ['Ace', 'King', 'Queen', 'Jack',
    'Ten', 'Nine', 'Eight', 'Seven',
    'Six', 'Five', 'Four', 'Three', 'Two']

let textArea = document.querySelector('#text-area'),
    newGameButton = document.querySelector('#new-game-button'),
    hitButton = document.querySelector('#hit-button'),
    standButton = document.querySelector('#stand-button');

let gameStarted = false,
    gameOver = false,
    playerWon = false,
    tie = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

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
        else if (tie)
        {
            textArea.innerHTML += "TIE";
        }
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
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