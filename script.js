import Deck from './deck.js';

const deck = new Deck()

console.log('fresh deck: ', [...deck.cards])

deck.shuffle()

console.log('suffled deck: ', deck)