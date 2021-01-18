import Deck from './deck.js';

const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "J": 11,
  "Q":12,
  "K":13,
  "A":14,
}

// DOM Selectors
const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const text = document.querySelector('.text');
const playerDeckElement = document.querySelector('.player-deck');
const computerDeckElement = document.querySelector('.computer-deck');

// Player decks
let playerDeck;
let computerDeck;
let inRound;
let stop;

const startGame = () => {
  const deck = new Deck()
  deck.shuffle()  
  const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
  inRound = false
  stop = false
  cleanBeforeRound()
}

const cleanBeforeRound = () => {
  inRound = false
  computerCardSlot.innerHTML = ''
  playerCardSlot.innerHTML = ''
  text.innerText = ''
  updateDeckCount()
}

const updateDeckCount = () => {
  computerDeckElement.innerText = computerDeck.numberOfCards
  playerDeckElement.innerText = playerDeck.numberOfCards
}

const isRoundWinner = (cardOne, cardTwo) => {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

const isGameOver = deck => deck.numberOfCards === 0

const flipCards = () => {
  inRound = true
  const playerCard = playerDeck.pop()
  const computerCard = computerDeck.pop()

  playerCardSlot.appendChild(playerCard.getHTML())
  computerCardSlot.appendChild(computerCard.getHTML())

  updateDeckCount()

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "Win"
    playerDeck.push(playerCard)
    playerDeck.push(computerCard)
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "Lose"
    computerDeck.push(playerCard)
    computerDeck.push(computerCard)
  } else {
    text.innerText = "Draw"
    computerDeck.push(computerCard)
    playerDeck.push(playerCard)
  }

  if(isGameOver(playerDeck)) {
    text.innerText = 'You lose!!'
    stop = true
  } else if (isGameOver(computerDeck)) {
    text.innerText = 'You win'
  }
}

document.addEventListener('click', () => {
  if (stop) {
    startGame()
  } else {
    if(inRound) {
      cleanBeforeRound()
    } else {
      flipCards()
    }
  }
})

startGame()