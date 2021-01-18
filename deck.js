const SUITS = ['♠',	'♥', '♦',	'♣']
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

export default class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
  }
}

const freshDeck = () => SUITS.flatMap(suit => VALUES.map(value => new Card(suit, value)))