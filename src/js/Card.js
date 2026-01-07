import Suit from "./Suit.js";
import Value from "./Value.js";


/**
 * Represents playing cards of a standard 52-card deck.
 */
class Card extends Object {
    #value;
    #suit;

    /**
     * Constructor for the class.
     * @param {Value} value - Value of the card.
     * @param {Suit} suit - Suit of the card.
     */
    constructor(value, suit) {
        super();

        this.#value = value;
        this.#suit = suit;
    }

    get_value() {
        return this.#value;
    }

    get_suit() {
        return this.#suit;
    }

    /**
     * Greater than operation, only compares value.
     * @param {Card} other - Other card to be compared against.
     * @returns - boolean.
     */
    gt(other) {
        return this.#value > other.#value;
    }

    /**
     * Greater than or equal operation, only compares value.
     * @param {Card} other - Other card to be compared against.
     * @returns - boolean.
     */
    ge(other) {
        return this.#value >= other.#value;
    }

    /**
     * Less than operation, only compares value.
     * @param {Card} other - Other card to be compared against.
     * @returns - boolean.
     */
    lt(other) {
        return this.#value < other.#value;
    }

    /**
     * Less than or equal operation, only compares value.
     * @param {Card} other - Other card to be compared against.
     * @returns - boolean.
     */
    le(other) {
        return this.#value <= other.#value;
    }

    /**
     * Checks if 2 cards are of the same value and suit.
     * @param {Card} other - Other card to be compared against.
     * @returns - boolean.
     */
    eq(other) {
        return this.#value == other.#value && this.#suit == other.#suit;
    }

    /**
     * Checks if 2 cards are of the same value.
     * @param {Card} other - Other card to be compared against.
     * @returns - boolean.
     */
    eq_value(other) {
        return this.#value == other.#value;
    }

    /**
     * Checks if 2 cards are of the same suit.
     * @param {Card} other - Other card to be compared against.
     * @returns - boolean.
     */
    eq_suit(other) {
        return this.#suit == other.#suit;
    }

    /**
     * Checks if 2 cards have different values or suits.
     * @param {Card} other - Other card to be compared against.
     * @returns - boolean.
     */
    ne(other) {
        return this.#value != other.#value || this.#suit != other.#suit;
    }

    /**
     * Checks if 2 cards have different values.
     * @param {Card} other - Other card to be compared against.
     * @returns - boolean.
     */
    ne_value(other) {
        return this.#value != other.#value;
    }

    /**
     * Checks if 2 cards have different suits.
     * @param {Card} other - Other card to be compared against.
     * @returns - boolean.
     */
    ne_suit(other) {
        return this.#suit != other.#suit;
    }
}



export default Card;
