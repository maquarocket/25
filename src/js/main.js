import Card from "./Card.js";
import Suit from "./Suit.js";
import Value from "./Value.js";
import Deck from "./Deck.js";
import Hand from "./Hand.js";

// Handing quick instructions.
document.querySelector('.hide-quick-instructions').addEventListener('click', () => {document.querySelector('.quick-instructions').setAttribute('hidden', '')});
document.querySelector('.show-quick-instructions').addEventListener('click', () => {document.querySelector('.quick-instructions').removeAttribute('hidden')});

// Creating a deck of cards.
let target = document.getElementsByClassName('play-area')[0];
let deck = [];
for (let val in Value) {
    for (let suit in Suit) {
        let elem = document.createElement('my-card');
        let valueSpan = document.createElement('span');
        valueSpan.setAttribute('slot', 'value');
        valueSpan.innerText = val;
        elem.appendChild(valueSpan);
        let suitSpan = document.createElement('span');
        suitSpan.setAttribute('slot', 'suit');
        suitSpan.innerText = suit;
        elem.appendChild(suitSpan);
        deck.push(elem);
    }
}
deck = new Deck(deck);

// Dealing cards.
let startRestart = document.querySelector('.start-restart');
startRestart.addEventListener('click', () => {
    if (startRestart.innerText == 'Start Game') {
        deck.shuffle();
        let len = deck.count();
        for (let i = 0; i < len; i++) {
            target.appendChild(deck.draw());
        }
    startRestart.innerText = 'Restart Game';
    }
    else if (startRestart.innerText == 'Restart Game') {
        let cards = target.querySelectorAll('my-card');
        let len = cards.length;
        for (let i = len - 1; i >= 0; i--) {
            target.removeChild(cards[i]);
            deck.push(cards[i]);
        }
        deck.shuffle();
        len = deck.count();
        for (let i = 0; i < len; i++) {
            target.appendChild(deck.draw());
        }
    }
});
