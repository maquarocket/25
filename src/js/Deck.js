import Value from "./Value.js";
import Suit from "./Suit.js";
import Card from "./Card.js";

/**
 * A collection of Cards.
 * Meant for a standard 4 suit, 52-card deck.
 */
class Deck extends Object {
    #cards = [];

    /**
     * Constructor for the class.
     */
    constructor() {
        super();

        for (const s in Suit) {
            for (const v in Value) {
                this.#cards.push(new Card(v, s));
            }
        }
    }
    
    /**
     * Gives the number of remaining cards in the Deck.
     * 
     * @returns {Number} - The number of remaining cards in the deck.
     */
    count() {
        return this.#cards.length;
    }

    /**
     * Shuffles all remaining Cards in the Deck.
     */
    shuffle() {
        // Uses the Fisher-Yates shuffle algorithm (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).
        for (let i = this.#cards.length - 1; i >= 1; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.#cards[i], this.#cards[j]] = [this.#cards[j], this.#cards[i]];
        }
    }

    /**
     * Removes and gives the fisrt/top Card of the Deck.
     * 
     * @returns {Card} - Current top/first card of the Deck.
     */
    draw() {
        return this.#cards.shift();
    }

    /**
     * Adds a Card to the bottom of the Deck.
     * 
     * @param {Card} card - Card to be added to the bottom of the Deck.
     */
    push(card) {
        this.#cards.push(card);
    }
}


export default Deck;
