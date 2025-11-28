import Card from "./Card.js";
import Suit from "./Suit.js";
import Value from "./Value.js";


let myCard = new Card(Value.K, Suit.H);
let otherCard = new Card(Value.A, Suit.D);
let eqCard = new Card(Value.K, Suit.H);
let ltCard = new Card(Value[4], Suit.S);


console.log(myCard);
console.log(myCard.gt(ltCard));
console.log(myCard.ge(eqCard));
console.log(myCard.lt(otherCard));
console.log(myCard.le(otherCard));
console.log(myCard.le(eqCard));
console.log(myCard.eq(eqCard));
console.log(myCard.eq(myCard));
