import Deck from './deck.js';

// DOM Selectors
const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const text = document.querySelector('.text');
const playerDeckElement = document.querySelector('.player-deck');
const computerDeckElement = document.querySelector('.computer-deck');

debugger

// Player decks
let playerDeck;
let computerDeck;

const startGame = () => {
  const deck = new Deck()
  deck.shuffle()  
  const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
  cleanBeforeRound()
}

const cleanBeforeRound = () => {
  computerCardSlot.innerHTML = ''
  playerCardSlot.innerHTML = ''
  text.innerText = ''
  updateDeckCount()
}

const updateDeckCount = () => {
  computerDeckElement.innerText = computerDeck.numberOfCards
  playerDeckElement.innerText = playerDeck.numberOfCards
}

startGame()

console.log('playerDeck: ', playerDeck);
console.log('computerDeck: ', computerDeck);


// const deck = new Deck()

// console.log('fresh deck: ', [...deck.cards])

// deck.shuffle()

// console.log('suffled deck: ', deck)

// computerCardSlot.appendChild(deck.cards[9].getHTML())

// const fullDeck = document.querySelector('.full-deck')
// fullDeck.append(...deck.getHTML())