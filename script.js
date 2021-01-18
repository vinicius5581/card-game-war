import Deck from './deck.js';

const computerCardSlot = document.querySelector('.computer-card-slot');


const deck = new Deck()

console.log('fresh deck: ', [...deck.cards])

deck.shuffle()

console.log('suffled deck: ', deck)

computerCardSlot.appendChild(deck.cards[9].getHTML())