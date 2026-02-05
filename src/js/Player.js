import Value from "./Value.js";
import Suit from "./Suit.js";
import Card from "./Card.js";


/**
 * Represents a collection of Cards.
 */
class Player extends Object {
    #hand = [];
    #backup;
    #money = 0;
    #ui;

    /**
     * Constructor for the class.
     * @param {[Card]} cards - Array of cards. Can be empty list. 
     * @param {Card} backup - Backup card for the player.
     * @param {Number} money - Amount of money to start with.
     */
    constructor(cards, backup, money, uiElement) {
        super();

        this.#hand = cards;
        this.#backup = backup;
        this.#money = money;
        this.#ui = uiElement;
    }

    /**
     * Adds a Card to the Hand.
     * @param {Card} card - Card to be added.
     */
    add_card(card) {
        this.#hand.push(card);
    }

    /**
     * Gets all the Cards in the hand (not including backup card).
     * @returns - Array of Cards.
     */
    get_cards() {
        return this.#hand;
    }

    evaluate(commonCards) {
        let score = []; // Format: [type of hand, tiebreakers]
        // Sort hand first via buckets.
        let buckets = [];
        for (const e in Value) {buckets.push([])};
        this.#hand.forEach(card => {buckets[card.get_value()].push(card)});
        commonCards.forEach(card => {buckets[card.get_value()].push(card)});

        // Search for straights.
        if (this.#hand.length + commonCards.length >= 5) {
            for (let i = buckets.length - 1; i >= 3; i--) {
                if (buckets[i].length > 0) {
                    if (buckets.at(i-1).length > 0 && buckets.at(i-2).length > 0 && buckets.at(i-3).length > 0 && buckets.at(i-4).length > 0) {
                        // Straight found. Check if it is a flush.
                        let match = false;
                        for (let j = 0; j < buckets[i].length; j++) {
                            let card = buckets[i][j];
                            for (let k = 1; k <= 4; k++) {
                                match = false;
                                for (let l = 0; l < buckets.at(i-k).length; l++) {
                                    if (buckets.at(i-k)[l].eq_suit(card)) {
                                        match = true;
                                        break;
                                    }
                                }
                                if (!match) break;
                            }
                            if (match) break;
                        }
                        if (match) {
                            // Straight flush found. Check for royal flush.
                            if (buckets[i][0].get_value() == Value.A) {
                                score = [9, [Value.A]];
                            }
                            else {
                                score = [8, [buckets[i][0].get_value()]];
                            }
                        }
                        else {
                            score = [4, [buckets[i][0].get_value()]];
                        }
                    }
                }
                if (score.length > 0) break;
            }
        }

        // Full house, pairs, and of a kinds.
        let kinds = []; // Format: [value, count]
        if (score.length < 1 || score[0] < 8) {
            for (let i = buckets.length - 1; i >= 0; i--) {
                if (buckets[i].length >= 4) {
                    // Four of a kind found.
                    let highs = [i];
                    for (let j = buckets.length - 1; j >= 0; j--) {
                        if (buckets[j].length > 0 && j != i) {
                            highs.push(j);
                            break;
                        }
                    }
                    score = [7, highs];
                    break;
                }
                else if (buckets[i].length > 1) {
                    kinds.push([i, buckets[i].length]);
                }
            }
        }
        if ((score.length < 1 || score[0] < 7) && kinds.length > 0) {
            kinds = kinds.sort((s, o) => {return (s[1] == o[1]) ? o[0] - s[0] : o[1] - s[1]});
            if (kinds[0][1] == 3) {
                if (kinds.length > 1 && kinds[kinds.length-1][1] >= 2) {
                    // Full house found.
                    for (let i = 1; i < kinds.length; i++) {
                        if (kinds[i][1] == 2) {
                            score = [6, [kinds[0][0], kinds[i][0]]];
                            break;
                        }
                    }
                }
                else {
                    if (score.length < 1 || score[0] < 3) {
                        // Three of a kind found.
                        let highs = [kinds[0][0]];
                        for (let i = buckets.length - 1; i >= 0; i--) {
                            if (buckets[i].length > 0 && i != kinds[0][0]) {
                                highs.push(i);
                                if (highs.length == 3) break;
                            }
                        }
                        score = [3, highs];
                    }
                }
            }
            else if (kinds.length > 1) {
                // Two pair found.
                if (score.length < 1 || score[0] < 2) {
                    let highs = [kinds[0][0], kinds[1][0]];
                    for (let i = buckets.length - 1; i >= 0; i--) {
                        if (buckets[i].length > 0 && (i != highs[0] && i != highs[1])) {
                            highs.push(i);
                            break;
                        }
                    }
                    score = [2, highs];
                }
            }
            else {
                // One pair found.
                if (score.length < 1 || score[0] < 1) {
                    let highs = [kinds[0][0]];
                    for (let i = buckets.length - 1; i >= 0; i--) {
                        if (buckets[i].length > 0 && i != highs[0]) {
                            highs.push(i);
                            if (highs.length >= 4) break;
                        }
                    }
                    score = [1, highs];
                }
            }

            // Search for flush.
            if (score.length < 1 || score[0] < 5) {
                let suitBucket = {};
                for (const s in Suit) suitBucket[s] = [];
                let found = false;
                for (let i = buckets.length - 1; i >= 0; i--) {
                    if (buckets[i].length > 0) {
                        for (let j = 0; j < buckets[i].length; j++) {
                            suitBucket[buckets[i][j].get_suit().at(0)].push(buckets[i][j]);
                        }
                    }
                    for (let s in suitBucket) {
                        if (suitBucket[s].length >= 5) {
                            found = s;
                            break;
                        }
                    }
                    if (found) break;
                }
                if (found) {
                    // Flush found.
                    let highs = [];
                    for (let c of suitBucket[found]) highs.push(c.get_value());
                    score = [5, highs];
                }
            }
        }

        // Nothing found. Get high cards.
        if (score.length < 1) {
            let highs = [];
            for (let i = buckets.length - 1; i >= 0; i--) {
                if (buckets[i].length > 0) {
                    highs.push(i);
                    if (highs.length >= 5) break;
                }
            }
            score = [0, highs];
        }

        return score;
    }
}


export default Player;
