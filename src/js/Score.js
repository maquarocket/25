import { get_card_key } from "./Value.js";

class Score extends Object {
    #type;
    #tiebreakers;

    constructor(score) {
        super()

        this.#type = score[0];
        this.#tiebreakers = score[1];
    }

    eq(other) {
        let ans = this.#type == other.#type;
        if (ans) {
            for (let i = 0; i < this.#tiebreakers.length; i++) {
                ans = this.#tiebreakers[i] == other.#tiebreakers[i];
                if (!ans) break;
            }
        }
        return ans;
    }

    gt(other) {
        let greater = false;
        let equal = this.#type == other.#type;
        if (equal) {
            for (let i = 0; i < this.#tiebreakers.length; i++) {
                if (this.#tiebreakers[i] < other.#tiebreakers[i]) {
                    break;
                }
                else if (this.#tiebreakers[i] > other.#tiebreakers[i]) {
                    greater = true;
                    break;
                }
            }
        }
        else {greater = this.#type > other.#type};
        return greater;
    }

    lt(other) {
        let less = false;
        let equal = this.#type == other.#type;
        if (equal) {
            for (let i = 0; i < this.#tiebreakers.length; i++) {
                if (this.#tiebreakers[i] > other.#tiebreakers[i]) {
                    break;
                }
                else if (this.#tiebreakers[i] < other.#tiebreakers[i]) {
                    less = true;
                    break;
                }
            }
        }
        else {less = this.#type < other.#type};
        return less;
    }

    print() {
        let string = "";
        if (this.#type == 9) {
            string = "It's a Royal Flush!";
        }
        else if (this.#type == 8) {
            let high = get_card_key(this.#tiebreakers[0]).toString();
            string = high + "-high straight flush.";
        }
        else if (this.#type == 7) {
            let kind = get_card_key(this.#tiebreakers[0]).toString();
            let high = get_card_key(this.#tiebreakers[1]).toString();
            string = "Four (" + kind + ") of a kind; " + high + " high card.";
        }
        else if (this.#type == 6) {
            let big = get_card_key(this.#tiebreakers[0]).toString();
            let small = get_card_key(this.#tiebreakers[1]).toString();
            string = "Full house, " + big + " & " + small + ".";
        }
        else if (this.#type == 5) {
            let highs = [];
            for (let v of this.#tiebreakers) {
                highs.push(get_card_key(v).toString());
            }
            string = "Flush";
            for (let h of highs) {
                string += ", " + h;
            }
            string += ".";
        }
        else if (this.#type == 4) {
            let high = get_card_key(this.#tiebreakers[0]).toString();
            string = high + "-high straight.";
        }
        else if (this.#type == 3) {
            let kind = get_card_key(this.#tiebreakers[0]).toString();
            let high1 = get_card_key(this.#tiebreakers[1]).toString();
            let high2 = get_card_key(this.#tiebreakers[2]).toString();
            string = "Three (" + kind + ") of a kind; high cards " + high1 + ", " + high2 + ".";
        }
        else if (this.#type == 2) {
            let pair1 = get_card_key(this.#tiebreakers[0]).toString();
            let pair2 = get_card_key(this.#tiebreakers[1]).toString();
            let high = get_card_key(this.#tiebreakers[2]).toString();
            string = pair1 + " & " + pair2 + " pairs; " + high + " high card.";
        }
        else if(this.#type == 1) {
            let pair = get_card_key(this.#tiebreakers[0]).toString();
            let high1 = get_card_key(this.#tiebreakers[1]).toString();
            let high2 = get_card_key(this.#tiebreakers[2]).toString();
            let high3 = get_card_key(this.#tiebreakers[3]).toString();
            string = pair + " pair; high cards " + high1 + ", " + high2 + ", " + high3 + ".";
        }
        else if (this.#type == 0) {
            let highs = [];
            for (let v of this.#tiebreakers) {
                highs.push(get_card_key(v).toString());
            }
            for (let h of highs) {
                string += h + ", ";
            }
            string = string.slice(0, -2);
            string += " high.";
        }
        return string;
    }
}


export default Score;
