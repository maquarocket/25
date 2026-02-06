import Player from "./Player.js";

/**
 * Class to represent all state information of a single game of 25.
 */
class Game extends Object {
    #players = [];
    #deck;
    #folded = [];
    #bets = [];
    #runpool = [];
    #bowlPlayer = 0;
    #mainTable;
    #burnTable;
    #playTurn = 0;

    #movesUI;

    /**
     * Initialises a game of 25.
     * @param {Number} players - Number of players for the game. Must be between 1 and 14 inclusive.
     */
    constructor(players, deck) {
        super();

        if (players < 0 || players > 14) throw RangeError("Number of players out of range!");

        this.#players = Array.from(document.querySelector('.play-area').querySelectorAll('.player'));
        this.#deck = deck;
        this.#mainTable = document.querySelector('.play-area').querySelector('.main');
        this.#burnTable = document.querySelector('.play-area').querySelector('.burn');

        let temp = [];
        for (let i = 0; i < this.get_playerCount(); i++) {
            this.#folded.push(false);
            this.#bets.push(0);
            this.#runpool.push(0);
            let player = this.#players[i];
            player = new Player(Array.from(player.querySelector('.hand').querySelectorAll('my-card')), player.querySelector('.backup').querySelector('my-card'), parseInt(player.querySelector('.player-money').innerText.slice(1)), player);
            temp.push(player);
        }
        this.#players = temp;
        console.log(this.#players);

        this.#movesUI = document.querySelector('.moves-area');
        this.#movesUI.querySelector('.call').addEventListener('click', () => {this.play()});
    }

    /**
     * Gets the number of all players in the game.
     * @returns - Number of total players in the current game.
     */
    get_playerCount() {
        return this.#players.length;
    }

    play() {
        if (this.#playTurn == 0) {
            this.#burnTable.querySelector('.card-area').appendChild(this.#deck.draw());
            for (let i = 0; i < 3; i++) this.#mainTable.querySelector('.card-area').appendChild(this.#deck.draw());
            this.#playTurn += 1;
        }
        else if (this.#playTurn == 1 || this.#playTurn == 2) {
            this.#burnTable.querySelector('.card-area').appendChild(this.#deck.draw());
            this.#mainTable.querySelector('.card-area').appendChild(this.#deck.draw());
            this.#playTurn += 1;
        }
        else if (this.#playTurn == 3) {
            // results time!
        }
    }

    /**
     * Terminates a game
     */
    clean_up() {
    }
}


export default Game;
