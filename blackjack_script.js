// Blackjack

let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];

let values = ['Ace', 'King', 'Queen', 'Jack',
    'Ten', 'Nine', 'Eight', 'Seven',
    'Six', 'Five', 'Four', 'Three', 'Two']

let deck = [];

for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
        deck.push(values[valueIndex] + ' of ' + suits[suitIndex]);
    }
}

for(let i = 0; i < deck.length; i++){
    console.log(deck[i]);
    
}


let playerCards = [deck[0], deck[2]];

console.log("Welcome to Blackjack!")

console.log("You are dealt:");
console.log(" " + playerCards[0]);
console.log(" " + playerCards[1]);

