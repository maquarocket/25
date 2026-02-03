import Suit from "./Suit.js";
import Value from "./Value.js";


/**
 * Represents playing cards of a standard 52-card deck.
 */
class Card extends HTMLElement {
    #value;
    #suit;
    #flipped = false;
    #sr;

    /**
     * Constructor for the class.
     * @param {Value} value - Value of the card.
     * @param {Suit} suit - Suit of the card.
     */
    constructor(value, suit) {
        super();

        this.#value = value;
        this.#suit = suit;

        let template = document.getElementById('my-card');
        const sr = this.attachShadow({mode:'open'});
        sr.appendChild(document.importNode(template.content, true));
        this.#sr = sr;

        // Instantiate properties by slots.
        sr.addEventListener('slotchange', (e) => {
            let suit = this.innerText.charAt(this.innerText.length - 1);
            if (suit in Suit) {
                this.#suit = suit;
                this.#value = this.innerText.slice(0, this.innerText.length - 1);

                if (e.target.getAttribute('name') == 'suit') {
                    if (suit == 'D' || suit == 'H') {
                        e.target.setAttribute('class', 'red');
                    }
                    else {
                        e.target.setAttribute('class', 'black');
                    }
                }
            }
        });
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

    is_flipped() {
        return this.#flipped;
    }

    flip() {
        let card = this.#sr.getElementById('card');
        let elems = card.getElementsByTagName('slot');
        if (this.#flipped) {
            for (let e of elems) {
                e.removeAttribute('hidden');
            }
            card.classList.remove('back');
            this.#flipped = false;
        }
        else {
            for (let e of elems) {
                e.setAttribute('hidden', '');
            }
            card.classList.add('back');
            this.#flipped = true;
        }
    }
}


customElements.define('my-card', Card);
export default Card;
