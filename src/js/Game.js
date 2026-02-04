/**
 * Class to represent all state information of a single game of 25.
 */
class Game extends Object {
    #playerCount = 0;

    constructor(players) {
        super();

        if (players < 0 || players > 14) throw RangeError("Number of players out of range!");
        this.#playerCount = players;
    }

    get_playerCount() {
        return this.#playerCount;
    }
}


export default Game;
