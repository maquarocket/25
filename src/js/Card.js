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
        // https://stackoverflow.com/questions/4936324/javascript-remove-an-event-listener-from-within-that-listener
        let self_destruct_listener = (element, eventType, callback) => {
            let handler = (e) => {
                callback(e, () => {element.removeEventListener(eventType, handler)});
            }
            element.addEventListener(eventType, handler);
        }

        self_destruct_listener(sr, 'slotchange', (e, closeListener) => {
            let suit = this.innerText.charAt(this.innerText.length - 1);
            let value = this.innerText.slice(0, this.innerText.length - 1);
            if (suit in Suit && value in Value) {
                this.#suit = suit;
                this.#value = value;

                if (e.target.getAttribute('name') == 'value') {
                    if (suit == 'D' || suit == 'H') {
                        e.target.setAttribute('class', 'red');
                    }
                    else {
                        e.target.setAttribute('class', 'black');
                    }
                    closeListener();
                    
                    // Set suit as emojis.
                    let s = this.getElementsByTagName('span');
                    for (let t of s) if (t.getAttribute('slot') == 'suit') s = t;
                    s.innerText = Suit[this.#suit];
                }
            }
        })
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

    /**
     * Returns whether or not the card has its back shown.
     * @returns - Boolean.
     */
    is_flipped() {
        return this.#flipped;
    }

    /**
     * Alternates the displayed side of the card.
     */
    flip() {
        let card = this.#sr.getElementById('card');
        let elems = this.getElementsByTagName('span');
        if (this.#flipped) {
            for (let e of elems) {
                if (e.getAttribute('slot') == 'value') {
                    e.innerText = this.#value;
                }
                else if (e.getAttribute('slot') == 'suit') {
                    e.innerText = Suit[this.#suit];
                }
            }
            card.classList.remove('back');
            this.#flipped = false;
        }
        else {
            for (let e of elems) {
                e.innerText = '';
            }
            card.classList.add('back');
            this.#flipped = true;
        }
    }

    /**
     * Checks if a card is on 'half' display. USed for unswitched backup cards.
     * @returns - Boolean.
     */
    is_half() {
        return this.#sr.getElementById('card').classList.contains('half');
    }

    /**
     * Sets the half display status of a card.
     * @param {boolean} bool - True to display as half, else false.
     */
    display_half(bool) {
        if (bool) {
            this.#sr.getElementById('card').classList.add('half');
        }
        else {
            this.#sr.getElementById('card').classList.remove('half');
        }
    }
}


customElements.define('my-card', Card);
export default Card;
