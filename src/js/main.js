import Card from "./Card.js";
import Suit from "./Suit.js";
import Value from "./Value.js";
import Deck from "./Deck.js";
import Hand from "./Hand.js";
import Game from "./Game.js";

// Handing quick instructions.
document.querySelector('.hide-quick-instructions').addEventListener('click', () => {document.querySelector('.quick-instructions').setAttribute('hidden', '')});
document.querySelector('.show-quick-instructions').addEventListener('click', () => {document.querySelector('.quick-instructions').removeAttribute('hidden')});

// Creating a deck of cards.
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

let game;
let target = document.getElementsByClassName('play-area')[0];
let startRestart = document.querySelector('.start-restart');
function started() {return typeof game !== 'undefined'};
// Setting up the play area with players.
let players = document.getElementById('players-input');
players.addEventListener('input', (e) => {
    if (e.target.value <= 14 && e.target.value > 0) {
        if (!started()) {
            let hands = target.querySelectorAll('.hand');
            for (let hand of hands) {
                target.removeChild(hand);
            }
            for (let i = 0; i < e.target.value; i++) {
                let hand = document.createElement('div');
                hand.classList.add('hand');
                target.appendChild(hand);
            }
        }
        else {
            let current = game.get_playerCount();
            if (e.target.value >= current) {
                let hands = target.querySelectorAll('.hand');
                for (let i = current; i < hands.length; i++) {
                    target.removeChild(hands[[i]]);
                }
                for (let i = current; i < e.target.value; i++) {
                    let hand = document.createElement('div');
                    hand.classList.add('hand');
                    target.appendChild(hand);
                }
            }
        }
    }
});

// Dealing cards.
startRestart.addEventListener('click', () => {
    if (started()) {
        let current = game.get_playerCount();
        if (players.value < current) {
            let hands = target.querySelectorAll('.hand');
            for (let i = players.value; i < hands.length; i++) {
                target.removeChild(hands[[i]]);
            }
        }
        game = new Game(players.value);
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
    else {
        let hands = target.querySelectorAll('.hand');
        if (hands.length == 0) {
            for (let i = 0; i < players.value; i++) {
                let hand = document.createElement('div');
                hand.classList.add('hand');
                target.appendChild(hand);
            }
        }
        game = new Game(players.value);
        deck.shuffle();
        let len = deck.count();
        for (let i = 0; i < len; i++) {
            target.appendChild(deck.draw());
        }
        startRestart.innerText = 'Restart Game';
    }
});
