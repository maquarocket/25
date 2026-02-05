import Card from "./Card.js";
import Suit from "./Suit.js";
import Value from "./Value.js";
import Player from "./Player.js";


let myCard = new Card(Value.K, Suit.H);
let gtCard = new Card(Value.A, Suit.D);
let eqCard = new Card(Value.K, Suit.H);
let ltCard = new Card(Value[4], Suit.S);
let evCard = new Card(Value.K, Suit.C);
let esCard = new Card(Value[7], Suit.H);


console.log(myCard);
console.log(myCard.get_suit);
// Testing equal function.
console.assert(myCard.eq(myCard));
console.assert(myCard.eq(eqCard));
console.assert(!myCard.eq(gtCard));
console.assert(!myCard.eq(ltCard));
console.assert(!myCard.eq(evCard));
// Testing equal suit function.
console.assert(myCard.eq_suit(myCard));
console.assert(myCard.eq_suit(esCard));
console.assert(!myCard.eq_suit(gtCard));
console.assert(!myCard.eq_suit(evCard));
console.assert(!myCard.eq_suit(ltCard));
// Testing equal value function.
console.assert(myCard.eq_value(myCard));
console.assert(myCard.eq_value(evCard));
console.assert(!myCard.eq_value(gtCard));
console.assert(!myCard.eq_value(esCard));
// Testing not equal function.
console.assert(!myCard.ne(myCard));
console.assert(!myCard.ne(eqCard));
console.assert(myCard.ne(gtCard));
console.assert(myCard.ne(ltCard));
console.assert(myCard.ne(evCard));
// Testing not equal suit function.
console.assert(!myCard.ne_suit(myCard));
console.assert(!myCard.ne_suit(esCard));
console.assert(myCard.ne_suit(gtCard));
console.assert(myCard.ne_suit(evCard));
console.assert(myCard.ne_suit(ltCard));
// Testing not equal value function.
console.assert(!myCard.ne_value(myCard));
console.assert(!myCard.ne_value(evCard));
console.assert(myCard.ne_value(gtCard));
console.assert(myCard.ne_value(esCard));
// Testing less than function.
console.assert(!myCard.lt(myCard));
console.assert(!myCard.lt(eqCard));
console.assert(!myCard.lt(evCard));
console.assert(myCard.lt(gtCard));
console.assert(!myCard.lt(ltCard));
// Testing less than or equal to function.
console.assert(myCard.le(myCard));
console.assert(myCard.le(eqCard));
console.assert(myCard.le(evCard));
console.assert(myCard.le(gtCard));
console.assert(!myCard.le(ltCard));
// Testing greater than function.
console.assert(!myCard.gt(myCard));
console.assert(!myCard.gt(eqCard));
console.assert(!myCard.gt(evCard));
console.assert(!myCard.gt(gtCard));
console.assert(myCard.gt(ltCard));
// Testing greater than or equal to function.
console.assert(myCard.ge(myCard));
console.assert(myCard.ge(eqCard));
console.assert(myCard.ge(evCard));
console.assert(!myCard.ge(gtCard));
console.assert(myCard.ge(ltCard));


// let hand = new Hand([myCard, gtCard]);
// hand.add_card(eqCard);
// hand.add_card(ltCard);
// hand.evaluate([]);

function nc(val, suit) {
    return new Card(Value[val], Suit[suit]);
}
let evl;
let royalflush = new Player([nc('10', 'C'), nc('K', 'C'), nc('9', 'C'), nc('9', 'C'), nc('J', 'C'), nc('A', 'C'), nc('Q', 'C')]);
evl = royalflush.evaluate([]);
console.assert(evl[0] == 9 && evl[1].length == 1 && evl[1][0] == Value.A);

let straightflush = new Player([nc('9', 'H'), nc('8', 'H'), nc('4', 'H'), nc('9', 'D'), nc('6', 'H'), nc('5', 'H'), nc('7', 'H')]);
evl = straightflush.evaluate([]);
console.assert(evl[0] == 8 && evl[1].length == 1 && evl[1][0] == Value[9]);

let fourofakind = new Player([nc('2', 'S'), nc('2', 'H'), nc('J', 'D'), nc('J', 'C'), nc('2', 'D'), nc('2', 'H')]);
evl = fourofakind.evaluate([]);
console.assert(evl[0] == 7 && evl[1].length == 2 && evl[1][0] == Value[2] && evl[1][1] == Value.J);

let fullhouse = new Player([nc('2', 'H'), nc('4', 'S'), nc('2', 'S'), nc('3', 'S'), nc('2', 'S'), nc('4', 'S')]);
evl = fullhouse.evaluate([]);
console.assert(evl[0] == 6 && evl[1].length == 2 && evl[1][0] == Value[2] && evl[1][1] == Value[4]);

let flush = new Player([nc('3', 'D'), nc('7', 'D'), nc('2', 'D'), nc('8', 'C'), nc('8', 'D'), nc('5', 'D'), nc('4', 'D')]);
evl = flush.evaluate([]);
console.assert(evl[0] == 5 && evl[1].length == 5 && evl[1][0] == Value[8] && evl[1][1] == Value[7] && evl[1][2] == Value[5] && evl[1][3] == Value[4] && evl[1][4] == Value[3]);

let straight = new Player([nc('A', 'H'), nc('5', 'C'), nc('3', 'D'), nc('K', 'C'), nc('2', 'S'), nc('4', 'C'), nc('Q', 'H')]);
evl = straight.evaluate([]);
console.assert(evl[0] == 4 && evl[1].length == 1 && evl[1][0] == Value[5]);

let threeofakind = new Player([nc('7', 'H'), nc('2', 'C'), nc('5', 'S'), nc('7', 'C'), nc('Q', 'D'), nc('7', 'D'), nc('3', 'H')]);
evl = threeofakind.evaluate([]);
console.assert(evl[0] == 3 && evl[1].length == 3 && evl[1][0] == Value[7] && evl[1][1] == Value.Q && evl[1][2] == Value[5]);

let twopair = new Player([nc('A', 'D'), nc('4', 'H'), nc('K', 'D'), nc('2', 'C'), nc('3', 'S'), nc('A', 'S'), nc('4', 'S')]);
evl = twopair.evaluate([]);
console.assert(evl[0] == 2 && evl[1].length == 3 && evl[1][0] == Value.A && evl[1][1] == Value[4] && evl[1][2] == Value.K);

let pair = new Player([nc('9', 'S'), nc('2', 'C'), nc('K', 'C'), nc('5', 'H'), nc('9', 'D'), nc('8', 'C'), nc('3', 'C')]);
evl = pair.evaluate([]);
console.assert(evl[0] == 1 && evl[1].length == 4 && evl[1][0] == Value[9] && evl[1][1] == Value.K && evl[1][2] == Value[8] && evl[1][3] == Value[5]);

let highcard = new Player([nc('2', 'H'), nc('3', 'H'), nc('A', 'D'), nc('4', 'H'), nc('K', 'C'), nc('J', 'S'), nc('Q', 'S')]);
evl = highcard.evaluate([]);
console.assert(evl[0] == 0 && evl[1].length == 5 && evl[1][0] == Value.A && evl[1][1] == Value.K && evl[1][2] == Value.Q && evl[1][3] == Value.J && evl[1][4] == Value[4]);


// // Testing ordering of draw & push.
// import Deck from "./Deck.js";
// let deck = new Deck();
// console.assert(deck.count() == 52);
// for (let i = 0; i < 52; i++) {
//     let card = deck.draw();
//     card = [card, i];
//     deck.push(card);
// }
// for (let i = 0; i < 52; i++) {
//     console.assert(deck.draw()[1] == i);
// }
