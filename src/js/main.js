import Card from "./Card.js";
import Suit from "./Suit.js";
import Value from "./Value.js";
import Deck from "./Deck.js";
import Player from "./Player.js";
import Game from "./Game.js";

// Handing quick instructions.
document.querySelector('.hide-quick-instructions').addEventListener('click', () => {document.querySelector('.quick-instructions').setAttribute('hidden', '')});
document.querySelector('.show-quick-instructions').addEventListener('click', () => {document.querySelector('.quick-instructions').removeAttribute('hidden')});

// Handling raise options.
let raiseValue = document.getElementById('raise-value');
document.querySelector('.increase-raise').addEventListener('click', () => {
    if (raiseValue.value < 50) {
        raiseValue.value = parseInt(raiseValue.value) + 10;
    }
})
document.querySelector('.decrease-raise').addEventListener('click', () => {
    if (raiseValue.value > 10) {
        raiseValue.value = parseInt(raiseValue.value) - 10;
    }
})

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
function make_hand(playerName) {
    let player = document.createElement('div');
    player.classList.add('player');
    let nameplate = document.createElement('div');
    nameplate.classList.add('nameplate');
    player.appendChild(nameplate);
    let name = document.createElement('p');
    name.classList.add('player-name');
    name.innerText = playerName;
    nameplate.appendChild(name);
    let amount = document.createElement('p');
    amount.classList.add('player-money');
    amount.innerText = '$1000';
    nameplate.appendChild(amount);
    let cardArea = document.createElement('div');
    cardArea.classList.add('card-area');
    player.appendChild(cardArea);
    let hand = document.createElement('div');
    hand.classList.add('hand');
    cardArea.appendChild(hand);
    let backup = document.createElement('div');
    backup.classList.add('backup');
    cardArea.appendChild(backup);
    return player;
}
// Setting up the play area with players.
let players = document.getElementById('players-input');
function get_playersInput() {return parseInt(players.value)};  // Somehow the input might return as string without this parsing.
players.addEventListener('input', (e) => {
    if (e.target.value <= 14 && e.target.value > 0) {
        if (!started()) {
            let hands = target.querySelectorAll('.player');
            // Skips 1 count for the hard-coded 'you' player.
            for (let i = 1; i < hands.length; i++) {
                target.removeChild(hands[i]);
            }
            for (let i = 1; i < e.target.value; i++) {
                let player = make_hand('Player '.concat(i+1));
                target.appendChild(player);
            }
        }
        else {
            let current = game.get_playerCount();
            if (parseInt(e.target.value) >= parseInt(current)) {
                let hands = target.querySelectorAll('.player');
                for (let i = current; i < hands.length; i++) {
                    target.removeChild(hands[[i]]);
                }
                for (let i = current; i < e.target.value; i++) {
                    let name = (parseInt(i) + 1).toString();
                    let player = make_hand('Player '.concat(name));
                    target.appendChild(player);
                }
            }
        }
    }
});

let showBox = document.getElementById('show-all-cards');
// Handle card flipping.
function show_cards(toShow) {
    let AIhands = Array.from(document.querySelectorAll('.player')).slice(1);
    for (let player of AIhands) {
        let cards = player.querySelectorAll('my-card');
        for (let card of cards) {
            if (card.is_flipped() == toShow) {
                card.flip();
            }
        }
    }
}
showBox.addEventListener('input', (e) => {show_cards(e.target.checked)});

// Dealing cards.
startRestart.addEventListener('click', () => {
    let hands = target.querySelectorAll('.player');
    if (started()) {
        // Retrieving cards.
        for (let player of hands) {
            let cards = player.querySelectorAll('my-card');
            for (let card of cards) {
                player.removeChild(card);
                if (card.is_flipped()) card.flip();
                deck.push(card);
            }
        }
        let current = game.get_playerCount();
        if (get_playersInput() < current) {
            hands = target.querySelectorAll('.player');
            for (let i = get_playersInput(); i < hands.length; i++) {
                target.removeChild(hands[[i]]);
            }
        }
    }
    else {
        if (hands.length != get_playersInput()) {
            for (let i = hands.length; i < get_playersInput(); i++) {
                let name = (parseInt(i) + 1).toString();
                let player = make_hand('Player '.concat(name));
                target.appendChild(player);
            }
        }
        startRestart.innerText = 'Restart Game';
    }
    // Actually dealing the cards.
    deck.shuffle();
    hands = document.querySelectorAll('.player');
    for (let player of hands) {
        for (let i = 0; i < 2; i++) {
            player.querySelector('.hand').appendChild(deck.draw());
        }
        let backupCard = deck.draw();
        backupCard.shadowRoot.getElementById('card').classList.add('half');
        player.querySelector('.backup').appendChild(backupCard);
    }
    show_cards(showBox.checked);
    game = new Game(get_playersInput());
});
