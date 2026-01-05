import Card from "./Card.js";
import Suit from "./Suit.js";
import Value from "./Value.js";


let myCard = new Card(Value.K, Suit.H);
let gtCard = new Card(Value.A, Suit.D);
let eqCard = new Card(Value.K, Suit.H);
let ltCard = new Card(Value[4], Suit.S);
let evCard = new Card(Value.K, Suit.C);
let esCard = new Card(Value[7], Suit.H);


console.log(myCard);
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

