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

export default class CardGameWar {
  constructor({computerCardSlot, playerCardSlot, computerDeckElement, playerDeckElement, text}) {
    this.computerCardSlot = computerCardSlot
    this.playerCardSlot = playerCardSlot
    this.computerDeckElement = computerDeckElement
    this.playerDeckElement = playerDeckElement
    this.playerDeck
    this.computerDeck
    this.text = text
    this.inRound
    this.stop

    document.addEventListener('click', this.onAction.bind(this))       
    document.addEventListener('keydown', this.onAction.bind(this))       
  }

  onAction() {
    if (this.stop) {
      this.startGame()
    } else {
      if(this.inRound) {
        this.cleanBeforeRound()
      } else {
        this.flipCards()
      }
    }
  }

  startGame() {
    const deck = new Deck()
    deck.shuffle()  
    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
    this.playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
    this.computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
    this.inRound = false
    this.stop = false
    this.cleanBeforeRound()
  }

  cleanBeforeRound() {
    this.inRound = false
    this.computerCardSlot.innerHTML = ''
    this.playerCardSlot.innerHTML = ''
    this.text.innerText = ''
    this.updateDeckCount()
  }

  updateDeckCount() {
    this.computerDeckElement.innerText = this.computerDeck.numberOfCards
    this.playerDeckElement.innerText = this.playerDeck.numberOfCards
  }

  isRoundWinner = (cardOne, cardTwo) => CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]

  isGameOver = (deck) => deck.numberOfCards === 0


  flipCards() {
    this.inRound = true
    const playerCard = this.playerDeck.pop()
    const computerCard = this.computerDeck.pop()
  
    this.playerCardSlot.appendChild(playerCard.getHTML())
    this.computerCardSlot.appendChild(computerCard.getHTML())
  
    this.updateDeckCount()
  
    if (this.isRoundWinner(playerCard, computerCard)) {
      this.text.innerText = "Win"
      this.playerDeck.push(playerCard)
      this.playerDeck.push(computerCard)
    } else if (this.isRoundWinner(computerCard, playerCard)) {
      this.text.innerText = "Lose"
      this.computerDeck.push(playerCard)
      this.computerDeck.push(computerCard)
    } else {
      this.text.innerText = "Draw"
      this.computerDeck.push(computerCard)
      this.playerDeck.push(playerCard)
    }
  
    if(this.isGameOver(this.playerDeck)) {
      this.text.innerText = 'You lose!!'
      this.stop = true
    } else if (this.isGameOver(this.computerDeck)) {
      this.text.innerText = 'You win'
    }
  }
}
