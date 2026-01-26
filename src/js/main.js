import Card from "./Card.js";
import Suit from "./Suit.js";
import Value from "./Value.js";
import Hand from "./Hand.js";

document.querySelector('.hide-quick-instructions').addEventListener('click', () => {document.querySelector('.quick-instructions').setAttribute('hidden', '')});
document.querySelector('.show-quick-instructions').addEventListener('click', () => {document.querySelector('.quick-instructions').removeAttribute('hidden')});
