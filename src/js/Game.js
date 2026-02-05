/**
 * Class to represent all state information of a single game of 25.
 */
class Game extends Object {
    #playerCount = 0;
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

        this.#players = Array.from(document.getElementsByClassName('play-area')[0].getElementsByClassName('hand'));
        this.#mainTable = document.getElementsByClassName('play-area')[0].getElementsByClassName('main');
        this.#burnTable = document.getElementsByClassName('play-area')[0].getElementsByClassName('burn');

        for (let i = 0; i < this.get_playerCount(); i++) {
            this.#folded.push(false);
            this.#bets.push(0);
            this.#runpool.push(0);
        }
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
