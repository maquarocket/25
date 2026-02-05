import Player from "./Player.js";

/**
 * Class to represent all state information of a single game of 25.
 */
class Game extends Object {
    #players = [];
    #folded = [];
    #bets = [];
    #runpool = [];
    #bowlPlayer = 0;
    #mainTable;
    #burnTable;

    /**
     * Initialises a game of 25.
     * @param {Number} players - Number of players for the game. Must be between 1 and 14 inclusive.
     */
    constructor(players) {
        super();

        if (players < 0 || players > 14) throw RangeError("Number of players out of range!");

        this.#players = Array.from(document.getElementsByClassName('play-area')[0].getElementsByClassName('player'));
        this.#mainTable = document.getElementsByClassName('play-area')[0].getElementsByClassName('main');
        this.#burnTable = document.getElementsByClassName('play-area')[0].getElementsByClassName('burn');

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
    }

    /**
     * Gets the number of all players in the game.
     * @returns - Number of total players in the current game.
     */
    get_playerCount() {
        return this.#players.length;
    }

    play() {
        setTimeout(1000);
    }

    /**
     * Terminates a game
     */
    clean_up() {
    }
}


export default Game;
